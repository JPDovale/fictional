import { Button } from '@components/useFull/Button';
import { useSnowflakeStructure } from '@hooks/useSnowflakeStructure';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import * as Tabs from '@radix-ui/react-tabs';
import { useRoutes } from '@store/Routes';

interface EditorContentProps {
  project: ProjectModelResponse | null;
}

export function EditorContent({ project }: EditorContentProps) {
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));
  const { useSnowflakeStructureVerifications, snowflakeEditorButtons } =
    useSnowflakeStructure();
  const { verifications } = useSnowflakeStructureVerifications(
    project?.books[0].snowflakeStructure
  );

  return (
    <Tabs.Content value="editor" asChild>
      <div className="outline-none gap-3 flex flex-col mt-3 items-center">
        {snowflakeEditorButtons.map(({ Icon, keyOfVerify, title }) => {
          const { activeInProject, disabled, redirectorProject } =
            verifications[keyOfVerify as keyof typeof verifications]();

          return (
            <Button.Root
              key={title}
              title={title}
              size="xs"
              disabled={disabled}
              active={activeInProject}
              onClick={() =>
                setPathname({
                  routerParameterized: redirectorProject(project!.id),
                })
              }
            >
              <Button.Icon>
                <Icon />
              </Button.Icon>
            </Button.Root>
          );
        })}
      </div>
    </Tabs.Content>
  );
}
