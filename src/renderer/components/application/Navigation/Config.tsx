import * as Dialog from '@radix-ui/react-dialog'
import { Computer, Moon, Settings, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@rHooks/useTheme'
import { Theme, useInterfaceStore } from '@rStores/useInterfaceStore'
import { tv } from 'tailwind-variants'
import localstorageFunctions from '@rUtils/localstorageFunctions'
import { LocalStorageKeys } from '@rConfigs/localstorageKeys'
import { Button } from '../Button'

export const configContentStyle = tv({
  base: 'p-4 data-[state=open]:animate-contentShow absolute w-[30%] h-[70%] top-[50%] left-[50%] translate-x-[-50%] rounded-md border border-purple900 shadow-2xl shadow-black translate-y-[-50%] z-[101]',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100 bg-gray100',
      [Theme.LIGHT]: 'text-text800 bg-gray900',
      [Theme.SYSTEM]: '',
    },
  },
})

export function Config() {
  const [configIsOpen, setConfigIsOpen] = useState(false)

  const { theme, changeTheme } = useTheme()

  const { setLockSnowflakeSteps, lockSnowflakeSteps } = useInterfaceStore(
    (state) => ({
      setLockSnowflakeSteps: state.setLockSnowflakeSteps,
      lockSnowflakeSteps: state.lockSnowflakeSteps,
    }),
  )

  const themeSaved = localstorageFunctions.Get<Theme>(LocalStorageKeys.THEME)

  const isDarkTheme = themeSaved === Theme.DARK
  const isLightTheme = themeSaved === Theme.LIGHT
  const isSystemTheme = themeSaved === Theme.SYSTEM

  const isLockSnowflakeSteps = lockSnowflakeSteps === true

  return (
    <Dialog.Root open={configIsOpen} onOpenChange={setConfigIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex self-center mb-4 focus:scale-[120%] "
          type="button"
        >
          <Settings className="w-5 h-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[100]" />

        <Dialog.Content className={configContentStyle({ theme })}>
          <Dialog.Title className="font-title text-lg text-center">
            Configurações
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 focus:scale-[120%]"
              aria-label="close"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm">Tema</span>

              <div className="flex justify-between gap-2">
                <Button.Root
                  onClick={() => changeTheme(Theme.DARK)}
                  size="xs"
                  width="full"
                  active={isDarkTheme}
                >
                  <Button.Icon>
                    <Moon />
                  </Button.Icon>
                  <Button.Text>Escuro</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => changeTheme(Theme.LIGHT)}
                  size="xs"
                  width="full"
                  active={isLightTheme}
                >
                  <Button.Icon>
                    <Sun />
                  </Button.Icon>
                  <Button.Text>Claro</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => changeTheme(Theme.SYSTEM)}
                  size="xs"
                  width="full"
                  active={isSystemTheme}
                >
                  <Button.Icon>
                    <Computer />
                  </Button.Icon>
                  <Button.Text>Sistema</Button.Text>
                </Button.Root>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm">Travar passos no mode snowflake</span>

              <div className="flex justify-between gap-2">
                <Button.Root
                  onClick={() => setLockSnowflakeSteps(true)}
                  size="xs"
                  width="full"
                  active={isLockSnowflakeSteps}
                >
                  <Button.Text>Sim</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => setLockSnowflakeSteps(false)}
                  size="xs"
                  width="full"
                  active={!isLockSnowflakeSteps}
                >
                  <Button.Text>Não</Button.Text>
                </Button.Root>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Config.displayName = 'Navigation.Config'
