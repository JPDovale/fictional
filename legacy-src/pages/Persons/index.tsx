import { Page404 } from '@components/404'
import { PersonCard } from '@components/PersonsComponents/PersonCard'
import { Button } from '@components/useFull/Button'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useProjects } from '@store/Projects'
import { useRoutes } from '@store/Routes'
import { UserPlus } from 'lucide-react'

export function PersonsPage() {
  const { setPathname } = useRoutes()
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }))

  function handleNavigateToPerson(personId: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projectPerson.to(
        currentProject!.id,
        personId,
      ),
    })
  }

  if (currentProject?.structure === 'snowflake') return <Page404 />

  return (
    <main className="flex-1 p-4 flex flex-col gap-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h2 className="text-3xl font-bold mb-4">
        Seus personagens estão no modo padrão
      </h2>
      <span className="text-sm text-justify">
        O modo padrão não gera nenhuma limitação para você... Ele é menos
        opinado em como você deveria criar seus personagens, porem exige um
        pouco mais de conhecimento técnico.
        <br />
        <br />
        <strong>Por que os personagens estão no modo padrão?</strong>
        <br />
        <br />
        Esse modo é defino durante a escolha da estrutura de 3 atos. Algumas
        estruturas carregam um método de criação de personagens diferente e como
        a estrutura de três atos é mais &quot;liberal&quot; nós deixamos uma
        estrutura padrão para a criação dos personagens
      </span>

      <h2 className="text-xl text-center uppercase font-bold mt-8">
        Seus personagens:
      </h2>

      <Button.Root
        size="xxs"
        onClick={() => setPathname(RoutesAvailable.createPerson.path)}
      >
        <Button.Icon>
          <UserPlus />
        </Button.Icon>
        <Button.Text>Criar um novo personagem</Button.Text>
      </Button.Root>

      <div
        data-without-person={currentProject?.persons.length === 0}
        className="grid grid-cols-3 data-[without-person=true]:grid-cols-1  gap-x-6 gap-y-4"
      >
        {currentProject?.persons.length !== 0 ? (
          currentProject?.persons.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={handleNavigateToPerson}
            />
          ))
        ) : (
          <span className="text-xs opacity-50">
            Nenhum personagem criado para esse projeto
          </span>
        )}
      </div>
    </main>
  )
}
