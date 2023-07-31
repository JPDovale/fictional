import { Button } from '@components/useFull/Button';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonStanding, Printer, VenetianMask } from 'lucide-react';
import { usePersons } from '@store/Persons';
import { getDate } from '@utils/dates/getDate';
import { useEffect, useState } from 'react';
import { useNav } from '@hooks/useNav';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { useTheme } from '@hooks/useTheme';
import { avatarStyles, personNavStyles } from './styles';

export function PersonNavigate() {
  const [isOpen, setIsOpen] = useState(true);
  const [isToShowContent, setIsToShowContent] = useState(true);

  const { person } = usePersons((state) => ({ person: state.currentPerson }));
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

    setIsOpen(tabIsOpem);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setIsToShowContent(true);
      }, 335);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  return (
    <>
      <div className={personNavStyles({ isOpen, theme })}>
        <Tabs.Root
          value={isOpen ? 'person' : 'editor'}
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
                  {isOpen && (
                    <Button.Text className="font-title">Sobre</Button.Text>
                  )}

                  {!isOpen && (
                    <Button.Icon>
                      <VenetianMask />
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

          <Avatar.Root className={avatarStyles({ isOpen })}>
            <Avatar.Image
              className="ease-in-out duration-300 w-full flex items-center justify-center rounded-full bg-transparent overflow-hidden"
              src={person?.image.url ?? undefined}
              alt={person?.image.alt}
            />
            <Avatar.Fallback>
              <VenetianMask
                data-open={isOpen}
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
                    <span className="font-title">
                      {person?.name ? person.name.fullName : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Biografia
                    </span>
                    <span className="text-xs">
                      {person?.biography ? person.biography : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">Idade</span>
                    <span className="text-xs">
                      {person?.age ? `${person.age} anos` : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Criado em
                    </span>
                    <span className="text-xs">
                      {person?.createdAt
                        ? getDate(person.createdAt)
                        : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Atualizado em
                    </span>
                    <span className="text-xs">
                      {person?.updatedAt
                        ? getDate(person.updatedAt)
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
                  RoutesAvailable.projects.id.persons.id.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projects.id.persons.id.to(
                        person!.projectId,
                        person!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <PersonStanding />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                active={
                  RoutesAvailable.projects.id.persons.id.history.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projects.id.persons.id.history.to(
                        person!.projectId,
                        person!.id
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Printer />
                </Button.Icon>
              </Button.Root>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div
        data-open={isOpen}
        className="min-w-[16rem] data-[open=false]:min-w-[4rem] ease-in-out duration-300"
      />
    </>
  );
}
