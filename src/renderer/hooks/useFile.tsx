import { Requester } from '@infra/requester/requester';
import { useUser } from './useUser';
import { GetFileBody } from '@modules/files/gateways/GetFile.gateway';
import {
  FilePresented,
  FileResponse,
} from '@modules/files/presenters/File.presenter';
import { Accessors } from '@infra/requester/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StatusCode } from '@shared/core/types/StatusCode';
import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { Optional } from '@shared/core/types/Optional';
import { UpdateFileBody } from '@modules/files/gateways/UpdateFile.gateway';
import { useToast } from '@rComponents/ui/use-toast';

interface UseFileProps {
  fileId?: string;
  projectId?: string;
}

interface FileQueryData {
  file: FileResponse | null;
}

export function useFile({ projectId, fileId }: UseFileProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<unknown, Error, FileQueryData>({
    queryKey: [`projects:${projectId}:files:${fileId}`],
    queryFn: async () => {
      if (!user?.id || !fileId || !projectId) {
        return {
          file: null,
        };
      }

      const response = await Requester.requester<GetFileBody, FilePresented>({
        access: Accessors.GET_FILE,
        data: {
          userId: user?.id ?? '',
          fileId,
          projectId,
        },
      });

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }

      if (response.status === StatusCode.OK && response.data) {
        const { file } = response.data;

        localstorageFunctions.Set(getTempPersistenceKey(), file.content);

        return {
          file,
        };
      }

      return {
        file: null,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const file = data?.file ?? null;

  const { mutateAsync: updateFile } = useMutation<
    void,
    Error,
    Optional<UpdateFileBody, 'userId' | 'fileId' | 'projectId'>
  >({
    mutationFn: async (variables) => {
      if (!user?.id || !fileId || !projectId) return;

      const response = await Requester.requester<UpdateFileBody>({
        access: Accessors.UPDATE_FILE,
        data: {
          projectId,
          fileId,
          userId: user?.id ?? '',
          ...variables,
        },
      });

      if (response.status !== StatusCode.OK) {
        toast({
          title: response.title,
          description: response.message,
          variant: 'destructive',
        });
      }
    },
    onSuccess: (_, { title, content }) => {
      queryClient.setQueryData(
        [`projects:${projectId}:files:${fileId}`],
        (cachedData: FileQueryData) => {
          return {
            file: {
              id: cachedData.file?.id,
              projectId: cachedData.file?.projectId,
              createdAt: cachedData.file?.createdAt,
              updatedAt: cachedData.file?.updatedAt,
              title: title === undefined ? cachedData.file?.title : title,
              content:
                content === undefined ? cachedData.file?.content : content,
            },
          };
        }
      );
    },
  });

  function getTempPersistenceKey() {
    return `${LocalStorageKeys.EDITOR_TEMP_PERSISTENCE}:projects:${projectId}:files:${fileId}` as LocalStorageKeys;
  }

  function getTempPersistence() {
    const value = localstorageFunctions.Get<string>(getTempPersistenceKey());
    return value ?? '';
  }

  return {
    file,
    isLoadingFile: isLoading,
    updateFile,
    refetchFile: refetch,
    getTempPersistenceKey,
    getTempPersistence,
  };
}
