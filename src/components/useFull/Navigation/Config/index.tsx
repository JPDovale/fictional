import * as Dialog from '@radix-ui/react-dialog';
import { Computer, Moon, Settings, Sun, X } from 'lucide-react';
import { Button } from '@components/useFull/Button';
import { useState } from 'react';
import { useTheme } from '@hooks/useTheme';
import { localStorageKeys } from '@config/localStorage/keys';
import { useInterface } from '@store/Interface';
import { configContentStyle } from './styles';

export function Config() {
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const { setLockSnowflakeSteps, lockSnowflakeSteps } = useInterface(
    (state) => ({
      setLockSnowflakeSteps: state.setLockSnowflakeSteps,
      lockSnowflakeSteps: state.lockSnowflakeSteps,
    })
  );

  const configTheme = localStorage.getItem(localStorageKeys.theme);

  return (
    <Dialog.Root open={configIsOpen} onOpenChange={setConfigIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex self-center mb-4 focus:scale-[120%] ease-in-out duration-300"
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
              className="absolute top-4 right-4 focus:scale-[120%] ease-in-out duration-300"
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
                  onClick={() => changeTheme('dark')}
                  size="xs"
                  width="full"
                  active={configTheme === 'dark'}
                >
                  <Button.Icon>
                    <Moon />
                  </Button.Icon>
                  <Button.Text>Escuro</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => changeTheme('light')}
                  size="xs"
                  width="full"
                  active={configTheme === 'light'}
                >
                  <Button.Icon>
                    <Sun />
                  </Button.Icon>
                  <Button.Text>Claro</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => changeTheme('system')}
                  size="xs"
                  width="full"
                  active={configTheme === 'system' || !configTheme}
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
                  active={lockSnowflakeSteps === true}
                >
                  <Button.Text>Sim</Button.Text>
                </Button.Root>

                <Button.Root
                  onClick={() => setLockSnowflakeSteps(false)}
                  size="xs"
                  width="full"
                  active={lockSnowflakeSteps === false}
                >
                  <Button.Text>Não</Button.Text>
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
