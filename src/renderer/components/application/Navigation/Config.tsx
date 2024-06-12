import * as Dialog from '@radix-ui/react-dialog';
import { Computer, Moon, Settings, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@rHooks/useTheme';
import { Theme } from '@rStores/useInterfaceStore';
import { tv } from 'tailwind-variants';
import localstorageFunctions from '@rUtils/localstorageFunctions';
import { LocalStorageKeys } from '@rConfigs/localstorageKeys';
import { Button } from '../Button';

export const configContentStyle = tv({
  base: 'data-[state=open]:animate-contentShow absolute w-[30%] h-[70%] top-[50%] left-[50%] translate-x-[-50%] rounded-md border border-purple900 shadow-2xl shadow-black translate-y-[-50%] z-[101]',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100 bg-gray100',
      [Theme.LIGHT]: 'text-text800 bg-gray900',
      [Theme.SYSTEM]: '',
    },
  },
});

interface ConfigProps {
  isOpen: boolean;
}

export function Config({ isOpen }: ConfigProps) {
  const [configIsOpen, setConfigIsOpen] = useState(false);

  const { theme, changeTheme } = useTheme();

  const themeSaved = localstorageFunctions.Get<Theme>(LocalStorageKeys.THEME);

  const isDarkTheme = themeSaved === Theme.DARK;
  const isLightTheme = themeSaved === Theme.LIGHT;
  const isSystemTheme = themeSaved === Theme.SYSTEM;

  return (
    <Dialog.Root open={configIsOpen} onOpenChange={setConfigIsOpen}>
      <Dialog.Trigger asChild>
        <button
          data-open={isOpen}
          className="flex mt-3 self-center mb-2 focus:scale-[104%] data-[open=true]:self-start data-[open=true]:px-2 items-center gap-2"
          type="button"
        >
          <Settings className="w-4 h-4" />
          {isOpen && (
            <span className="text-sm leading-none font-bold opacity-60">
              Configurações
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[100]" />

        <Dialog.Content className={configContentStyle({ theme })}>
          <Dialog.Title className="text-lg p-2 border-b border-purple800 font-bold opacity-60">
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

          <div className="flex flex-col px-2 gap-4 mt-2">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-sm font-bold">Tema</span>

              <div className="flex justify-between gap-2">
                <Button.Root
                  onClick={() => changeTheme(Theme.DARK)}
                  className="shadow-none"
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
                  className="shadow-none"
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
                  className="shadow-none"
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Config.displayName = 'Navigation.Config';
