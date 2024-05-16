import { Button } from '@components/useFull/Button'
import * as Tabs from '@radix-ui/react-tabs'
import * as Avatar from '@radix-ui/react-avatar'
import { Book, BookOpen, LayoutPanelTop } from 'lucide-react'
import { useBooks } from '@store/Books'
import { getDate } from '@utils/dates/getDate'
import { useEffect, useState } from 'react'
import { useNav } from '@hooks/useNav'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useRoutes } from '@store/Routes'
import { useTheme } from '@hooks/useTheme'
import { useInterface } from '@store/Interface'
import { useSnowflakeStructure } from '@hooks/useSnowflakeStructure'
import { avatarImageStyles, avatarStyles, personNavStyles } from './styles'

export function BookNavigate() {
  const { setSideBarIsOpen, sideBarIsOpen } = useInterface((state) => ({
    sideBarIsOpen: state.sideBarIsOpen,
    setSideBarIsOpen: state.setSidBarIsOpen,
  }))
  const [isToShowContent, setIsToShowContent] = useState(true)

  const { book } = useBooks((state) => ({ book: state.currentBook }))
  const { theme } = useTheme()
  const { makeBaseUrl, pathname } = useNav()
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }))
  const { useSnowflakeStructureVerifications, snowflakeEditorButtons } =
    useSnowflakeStructure()
  const { verifications } = useSnowflakeStructureVerifications(
    book?.snowflakeStructure,
  )

  function handleChangeTab(tab: string) {
    const tabIsOpem = tab !== 'editor'

    if (!tabIsOpem) {
      setIsToShowContent(false)
    }

    setSideBarIsOpen(tabIsOpem)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (!sideBarIsOpen) {
      setIsToShowContent(false)
    }

    if (sideBarIsOpen) {
      timeoutId = setTimeout(() => {
        setIsToShowContent(true)
      }, 335)
    }

    return () => clearTimeout(timeoutId)
  }, [sideBarIsOpen])

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
                      <BookOpen />
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
              src={book?.image.url ?? undefined}
              alt={book?.image.alt}
            />
            <Avatar.Fallback>
              <BookOpen
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
                    <span className="font-title">{book?.title}</span>
                  </div>

                  {book?.subtitle && (
                    <div className="flex flex-col w-full gap-0.5">
                      <span className="text-xxs uppercase opacity-40">
                        Subtitulo
                      </span>
                      <span className="text-xs">{book.subtitle}</span>
                    </div>
                  )}

                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Criado em
                    </span>
                    <span className="text-xs">
                      {book?.createdAt ? getDate(book.createdAt) : '??????????'}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0.5">
                    <span className="text-xxs uppercase opacity-40">
                      Atualizado em
                    </span>
                    <span className="text-xs">
                      {book?.updatedAt ? getDate(book.updatedAt) : '??????????'}
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
                  RoutesAvailable.projectBook.path === makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized: RoutesAvailable.projectBook.to(
                      book!.projectId,
                      book!.id,
                    ),
                  })
                }
              >
                <Button.Icon>
                  <Book />
                </Button.Icon>
              </Button.Root>

              <Button.Root
                size="xs"
                active={
                  RoutesAvailable.projectBookStructure.path ===
                  makeBaseUrl(pathname)
                }
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectBookStructure.to(
                        book!.projectId,
                        book!.id,
                      ),
                  })
                }
              >
                <Button.Icon>
                  <LayoutPanelTop />
                </Button.Icon>
              </Button.Root>

              {snowflakeEditorButtons.map(({ Icon, keyOfVerify, title }) => {
                const { activeInProject, disabled, redirectorBook } =
                  verifications[keyOfVerify as keyof typeof verifications]()

                return (
                  <Button.Root
                    key={title}
                    title={title}
                    size="xs"
                    disabled={disabled}
                    active={activeInProject}
                    onClick={() =>
                      setPathname({
                        routerParameterized: redirectorBook(
                          book!.projectId,
                          book!.id,
                        ),
                      })
                    }
                  >
                    <Button.Icon>
                      <Icon />
                    </Button.Icon>
                  </Button.Root>
                )
              })}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div
        data-open={sideBarIsOpen}
        className="min-w-[16rem] data-[open=false]:min-w-[3.5rem] ease-in-out duration-300"
      />
    </>
  )
}
