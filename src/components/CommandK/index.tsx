import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Button } from '@components/useFull/Button';
import { commandInterfaces } from '@config/command';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useInterface } from '@store/Interface';
import { usePersons } from '@store/Persons';
import { useProjects } from '@store/Projects';
import { useRoutes } from '@store/Routes';
import { File, Search, VenetianMask } from 'lucide-react';

export function CommandK() {
  const { commandKIsOpen, setCommandKIsOpen, handleChangeOpenCommandK } =
    useInterface((state) => ({
      commandKIsOpen: state.commandKIsOpen,
      setCommandKIsOpen: state.setCommandKIsOpen,
      handleChangeOpenCommandK: state.handleChangeOpenCommandK,
    }));

  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  const { projects } = useProjects((state) => ({
    projects: state.projects,
  }));

  const { persons } = usePersons((state) => ({
    persons: state.persons,
  }));

  return (
    <>
      <Button.Root
        size="xs"
        className="shadow-[unset] w-[25%]"
        onClick={handleChangeOpenCommandK}
      >
        <Button.Icon>
          <Search />
        </Button.Icon>
        <Button.Text>Buscar</Button.Text>
      </Button.Root>

      <CommandDialog open={commandKIsOpen} onOpenChange={setCommandKIsOpen}>
        <CommandInput placeholder="Qual comando deseja encontrar" />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          {commandInterfaces.map((ci) => (
            <CommandGroup key={ci.title} className="pb-4" heading={ci.title}>
              {ci.commands.map(({ link, key }) => {
                if (!link) return null;

                const { Icon, label, pathname } = link;

                return (
                  <CommandItem key={key}>
                    <Button.Root
                      className="mb-[-1rem]"
                      size="xs"
                      width="full"
                      align="start"
                      onClick={() => setPathname(pathname)}
                    >
                      <Button.Icon>
                        <Icon />
                      </Button.Icon>
                      <Button.Text className="flex-1">{label}</Button.Text>

                      <Button.Text>
                        {key
                          .split(',')
                          .map((k, i) =>
                            i === 0
                              ? `${k.toUpperCase()}`
                              : `+ ${k.toUpperCase()} `
                          )}
                      </Button.Text>
                    </Button.Root>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}

          {projects.length !== 0 && (
            <CommandGroup className="pb-8" heading="Projetos">
              {projects.map((project) => (
                <CommandItem key={project.id}>
                  <Button.Root
                    className="mb-[-1rem]"
                    size="xs"
                    width="full"
                    align="start"
                    onClick={() =>
                      setPathname({
                        routerParameterized: RoutesAvailable.projects.id.to(
                          project.id
                        ),
                      })
                    }
                  >
                    <Button.Icon>
                      <File />
                    </Button.Icon>

                    <Button.Text className="flex-1">{project.name}</Button.Text>
                  </Button.Root>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {persons.length !== 0 && (
            <CommandGroup className="pb-8" heading="Personagens">
              {persons.map((person) => (
                <CommandItem key={person.id}>
                  <Button.Root
                    className="mb-[-1rem]"
                    size="xs"
                    width="full"
                    align="start"
                    onClick={() =>
                      setPathname({
                        routerParameterized:
                          RoutesAvailable.projects.id.persons.id.to(
                            person.projectId,
                            person.id
                          ),
                      })
                    }
                  >
                    <Button.Icon>
                      <VenetianMask />
                    </Button.Icon>

                    <Button.Text className="flex-1">
                      {person.name?.firstName || person.name?.lastName
                        ? person.name.fullName
                        : `????????? | ${person.biography.slice(1, 60)}`}
                    </Button.Text>
                  </Button.Root>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
