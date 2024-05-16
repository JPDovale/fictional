import { Button } from '@components/useFull/Button'
import * as Tabs from '@radix-ui/react-tabs'
import * as Avatar from '@radix-ui/react-avatar'
import {
  ArrowBigLeft,
  BookOpenCheck,
  Building,
  Eye,
  MountainSnow,
  MoveUpRight,
  Target,
  VenetianMask,
} from 'lucide-react'
import { usePersons } from '@store/Persons'
import { getDate } from '@utils/dates/getDate'
import { useEffect, useState } from 'react'
import { useNav } from '@hooks/useNav'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useRoutes } from '@store/Routes'
import { useTheme } from '@hooks/useTheme'
import { avatarImageStyles, avatarStyles, personNavStyles } from './styles'

export function PersonExpansionSnowFlakeNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isToShowContent, setIsToShowContent] = useState(false)

  const { person } = usePersons((state) => ({ person: state.currentPerson }))
  const { theme } = useTheme()
  const { makeBaseUrl, pathname } = useNav()
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }))

  function handleChangeTab(tab: string) {
    const tabIsOpem = tab !== 'editor'

    if (!tabIsOpem) {
      setIsToShowContent(false)
    }

    setIsOpen(tabIsOpem)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setIsToShowContent(true)
      }, 335)
    }

    return () => clearTimeout(timeoutId)
  }, [isOpen])

  return (
    <>
      <div className={personNavStyles({ isOpen, theme })}>
        <Tabs.Root
          value={isOpen ? 'person' : 'editor'}
          onValueChange={(e) => handleChangeTab(e)}
        >
          <Tabs.List className="flex justify-between gap-4 p-2 pb-3 border-b border-b-expansion900">
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
              className={avatarImageStyles({ isOpen })}
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
                  RoutesAvailable.projectStructurePersonExpansionFunction
                    .path === makeBaseUrl(pathname)
                }
                title="Função"
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionFunction.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Building />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Objetivo"
                active={
                  RoutesAvailable.projectStructurePersonExpansionObjective
                    .path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionObjective.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Target />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Motivação"
                active={
                  RoutesAvailable.projectStructurePersonExpansionMotivation
                    .path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionMotivation.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <MoveUpRight />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Obstaculo"
                active={
                  RoutesAvailable.projectStructurePersonExpansionObstacle
                    .path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionObstacle.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <MountainSnow />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Aprendizado"
                active={
                  RoutesAvailable.projectStructurePersonExpansionApprenticeship
                    .path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionApprenticeship.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <BookOpenCheck />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Enredo pela visão desse personagem"
                active={
                  RoutesAvailable.projectStructurePersonExpansionPovByThisEye
                    .path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonExpansionPovByThisEye.to(
                        person!.projectId,
                        person!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <Eye />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                title="Voltar"
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructureCentralIdia.to(
                        person!.projectId,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <ArrowBigLeft />
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
  )
}
