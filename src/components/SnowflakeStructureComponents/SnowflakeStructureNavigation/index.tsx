import { Button } from '@components/useFull/Button';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import {
  ArrowDownWideNarrow,
  BookUp2,
  FileStack,
  Fingerprint,
  Focus,
  PilcrowSquare,
  Snowflake,
  UnfoldHorizontal,
  UserSquare,
  VenetianMask,
} from 'lucide-react';
import { getDate } from '@utils/dates/getDate';
import { useEffect, useState } from 'react';
import { useNav } from '@hooks/useNav';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { useTheme } from '@hooks/useTheme';
import { useProjects } from '@store/Projects';
import { useInterface } from '@store/Interface';
import { avatarImageStyles, avatarStyles, personNavStyles } from './styles';

export function SnowflakeStructureNavigate() {
  const { sideBarIsOpen, setSideBarIsOpen } = useInterface((state) => ({
    sideBarIsOpen: state.sideBarIsOpen,
    setSideBarIsOpen: state.setSidBarIsOpen,
  }));
  const [isToShowContent, setIsToShowContent] = useState(false);

  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }));
  const { theme } = useTheme();
  const { makeBaseUrl, pathname } = useNav();
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  function handleChangeTab(tab: string) {
    const tabIsOpem = tab !== 'editor';

    if (!tabIsOpem) {
      setIsToShowContent(false);
    }

    setSideBarIsOpen(tabIsOpem);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!sideBarIsOpen) {
      setIsToShowContent(false);
    }

    if (sideBarIsOpen) {
      timeoutId = setTimeout(() => {
        setIsToShowContent(true);
      }, 335);
    }

    return () => clearTimeout(timeoutId);
  }, [sideBarIsOpen]);

  return (
    <>
      <div className={personNavStyles({ isOpen: sideBarIsOpen, theme })}>
        <Tabs.Root
          value={sideBarIsOpen ? 'person' : 'editor'}
          onValueChange={(e) => handleChangeTab(e)}
        >
          <Tabs.List className="flex justify-between gap-4 p-2 pb-3 border-b border-b-base900">
            <Tabs.Trigger
              value="person"
              className="flex w-full flex-col rounded-md data-[state=active]:bg-gray100"
            >
              <Button.Root
                asChild
                className="shadow-none bg-transparent"
                size="xs"
              >
                <div>
                  {sideBarIsOpen && (
                    <Button.Text className="font-title">Sobre</Button.Text>
                  )}

                  {!sideBarIsOpen && (
                    <Button.Icon>
                      <Snowflake />
                    </Button.Icon>
                  )}
                </div>
              </Button.Root>
            </Tabs.Trigger>

            {isToShowContent && (
              <Tabs.Trigger
                value="editor"
                className="flex w-full flex-col rounded-md data-[state=active]:bg-gray100"
              >
                <Button.Root
                  asChild
                  className="shadow-none bg-transparent"
                  size="xs"
                >
                  <div>
                    <Button.Text className="font-title">Editor</Button.Text>
                  </div>
                </Button.Root>
              </Tabs.Trigger>
            )}
          </Tabs.List>

          <Avatar.Root className={avatarStyles({ isOpen: sideBarIsOpen })}>
            <Avatar.Image
              className={avatarImageStyles({ isOpen: sideBarIsOpen })}
              src={project?.image.url ?? undefined}
              alt={project?.image.alt}
            />
            <Avatar.Fallback>
              <Snowflake
                data-open={sideBarIsOpen}
                className="w-8 h-8 data-[open=false]:w-4 data-[open=false]:h-4 fill-purple800 ease-in-out duration-300"
              />
            </Avatar.Fallback>
          </Avatar.Root>

          <Tabs.Content value="person" asChild>
            <div className="p-2 outline-none flex flex-col items-center gap-4">
              {isToShowContent && (
                <>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">Nome</span>
                    <span className="font-title">{project?.name}</span>
                  </div>

                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Criado em
                    </span>
                    <span className="text-xs">
                      {project?.createdAt
                        ? getDate(project.createdAt)
                        : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Atualizado em
                    </span>
                    <span className="text-xs">
                      {project?.updatedAt
                        ? getDate(project.updatedAt)
                        : '??????????'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Tabs.Content>

          <Tabs.Content value="editor" asChild>
            <div className="outline-none gap-3 flex flex-col mt-3 items-center">
              <Button.Root
                size="xs"
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Focus />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled={
                  !project?.books[0]?.snowflakeStructure?.centralIdia ||
                  project?.books[0]?.snowflakeStructure?.centralIdia ===
                    '<p></p>'
                }
                active={
                  RoutesAvailable.projectStructureParagraph.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureParagraph.to(project!.id),
                  })
                }
              >
                <Button.Icon>
                  <PilcrowSquare />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled={
                  !project?.books[0]?.snowflakeStructure?.expansionToParagraph
                    ?.phrase1 ||
                  project?.books[0]?.snowflakeStructure?.expansionToParagraph
                    ?.phrase1 === '<p></p>'
                }
                active={
                  RoutesAvailable.projectStructurePersonsBase.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonsBase.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <VenetianMask />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled={
                  !project?.books[0].snowflakeStructure?.persons[0]
                    ?.snowflakeStructureBase?.function
                }
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <UnfoldHorizontal />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled={
                  !project?.books[0].snowflakeStructure?.expansionToPage
                    ?.paragraph1 ||
                  project?.books[0].snowflakeStructure?.expansionToPage
                    ?.paragraph1 === '<p></p>'
                }
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <UserSquare />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <ArrowDownWideNarrow />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled={
                  !project?.books[0].snowflakeStructure
                    ?.interweavingPersonsAndExpansion ||
                  project?.books[0].snowflakeStructure
                    ?.interweavingPersonsAndExpansion === '<p></p>'
                }
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Fingerprint />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <FileStack />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                disabled
                active={
                  RoutesAvailable.projectStructureCentralIdia.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        project!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <BookUp2 />
                </Button.Icon>
              </Button.Root>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div
        data-open={sideBarIsOpen}
        className="min-w-[16rem] max-w-[16rem] w-full data-[open=false]:min-w-[3.5rem] data-[open=false]:max-w-[3.5rem] ease-in-out duration-300"
      />
    </>
  );
}
