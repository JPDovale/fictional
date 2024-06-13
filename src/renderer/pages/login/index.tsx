import { GoogleLogo } from '@phosphor-icons/react'
import { Button } from '@rComponents/application/Button'
import { useTheme } from '@rHooks/useTheme'
import { mainStyles } from '@rStyles/theme'
import { OctagonAlert } from 'lucide-react'
import { useToast } from '@rComponents/ui/use-toast'
import { Requester } from '@infra/requester/requester'
import { Accessors } from '@infra/requester/types'
import { useEffect, useState } from 'react'
import { useUser } from '@rHooks/useUser'
import { Loading } from '@rComponents/application/Loading'
import { useNavigate } from 'react-router-dom'
import { UpdateUserBody } from '@modules/users/gateways/UpdateUser.gateway'
import { StatusCode } from '@shared/core/types/StatusCode'
import { CreateUserBody } from '@modules/users/gateways/CreateUser.gateway'
import { PresenterProps } from '@shared/core/contracts/Presenter'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, refetchUser } = useUser()
  const { theme } = useTheme()
  const { toast } = useToast()

  async function handleCreateLimitedUser() {
    setIsLoading(true)
    let response: PresenterProps | null = null

    if (user) {
      const res = await Requester.requester<UpdateUserBody>({
        access: Accessors.UPDATE_USER,
        data: {
          userId: user.id,
          skipLogin: true,
        },
      })

      response = res
    }

    if (!user) {
      const res = await Requester.requester<CreateUserBody>({
        access: Accessors.CREATE_USER,
        data: {
          email: 'ms@user.com',
          name: `FC User ${(Math.random() * 100).toString().split('.')[1]}`,
          skipLogin: true,
        },
      })

      response = res
    }

    if (!response) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar usuário',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    if (
      response.status === StatusCode.OK ||
      response.status === StatusCode.CREATED
    ) {
      await refetchUser()
      navigate('/')
    }

    if (
      response.status !== StatusCode.OK &&
      response.status !== StatusCode.CREATED
    ) {
      toast({
        title: response.title,
        description: response.message,
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  async function handleLoginWithGoogle() {
    window.electron.ipcRenderer.invoke(
      'open-url',
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000?clear=true'
        : 'https://vortex-fictional.vercel.app?clear=true',
    )
  }

  useEffect(() => {
    if (user?.skipLogin) {
      navigate('/')
    }
  }, [user, navigate])

  if (isLoading) {
    return (
      <main
        className={mainStyles({
          theme,
          className: 'h-screen w-screen bg-gray100',
        })}
      >
        <Loading />
      </main>
    )
  }

  return (
    <main
      className={mainStyles({
        theme,
        className: 'grid grid-cols-2 h-screen w-screen bg-gray100',
      })}
    >
      <section className="bg-gray200 flex flex-col gap-8 px-20 justify-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-7xl font-heading">Fictional</h2>
          <p className="text-lg font-bold">
            Desbloqueie seu Potencial Criativo!
          </p>
        </div>

        <hr className="opacity-30" />

        <p className="text-justify">
          Descubra o Fictional, onde escritores transformam ideias em histórias
          memoráveis com facilidade e confiança.
        </p>

        <p className="text-justify">
          Com nossa interface intuitiva e ferramentas avançadas, prometemos
          simplificar seu processo de escrita e elevar sua narrativa a um novo
          nível profissional.
        </p>

        <p className="text-justify">
          Junte-se a nós agora e comece sua jornada para se tornar um autor de
          destaque!
        </p>
      </section>

      <section className="h-full w-full flex flex-col py-4 px-20 justify-center items-center">
        <div className="flex flex-col w-full gap-4">
          <span className="text-3xl font-bold opacity-60 mb-4">Login</span>

          <Button.Root width="full" onClick={handleLoginWithGoogle}>
            <Button.Icon>
              <GoogleLogo />
            </Button.Icon>

            <Button.Text>Login com o Google</Button.Text>
          </Button.Root>

          <Button.Root width="full" onClick={handleCreateLimitedUser}>
            <Button.Icon>
              <OctagonAlert />
            </Button.Icon>

            <Button.Text>
              Continuar com a versão limitada (sem login)
            </Button.Text>
          </Button.Root>
        </div>
      </section>
    </main>
  )
}
