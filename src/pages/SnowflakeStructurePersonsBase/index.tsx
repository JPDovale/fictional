import { PersonCard } from '@components/PersonsComponents/PersonCard';
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation';
import { useBooks } from '@store/Books';
import { useProjects } from '@store/Projects';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { NewPersonForm } from './components/NewPersonForm';

export function SnowflakeStructurePersonsBasePage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }));

  const { bookSelected } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }));

  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  const book = bookSelected || project?.books[0];
  const persons = book?.snowflakeStructure?.persons ?? [];

  // const editorStateRef = useRef<string>(
  //   (isLoading ? '<p></p>' : book?.snowflakeStructure?.centralIdia) ?? '<p></p>'
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentCentralIdia = book?.snowflakeStructure?.centralIdia;

  //     if (!isLoading && book && currentCentralIdia !== editorStateRef.current) {
  //       updateSnowflakeStructure({
  //         bookId: book.id,
  //         centralIdia: editorStateRef.current,
  //       });
  //     }
  //   }, 1000 * 2);

  //   return () => clearInterval(interval);
  // }, [book, updateSnowflakeStructure, isLoading]);

  // function saveCentralIdia(text: string) {
  //   editorStateRef.current = text;
  // }

  // const { Editors } = useEditor({
  //   editors: [
  //     {
  //       id: 'centralIdia',
  //       onUpdate: saveCentralIdia,
  //       preValue: book?.snowflakeStructure?.centralIdia ?? '',
  //     },
  //   ],
  // });

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">Sobre quem?</h2>
        <span className="text-sm text-justify">
          Nesse passo, você desenvolve perfis detalhados para os principais
          personagens da sua história. A folha de personagem é uma ferramenta
          que contém informações relevantes sobre cada personagem, ajudando a
          compreender suas motivações, objetivos, obstáculos, personalidade e
          papel na trama.
        </span>

        <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

        <h2 className="font-bold text-sm uppercase mt-12 mb-4 opacity-60">
          Vamos criar seus personagens!
        </h2>

        <NewPersonForm projectId={project!.id} bookId={book!.id} />

        <div
          data-without-person={persons.length === 0}
          className="grid grid-cols-3 data-[without-person=true]:grid-cols-1 mt-10 gap-x-6 gap-y-4"
        >
          {persons.length !== 0 ? (
            persons.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onClick={() =>
                  setPathname({
                    routerParameterized:
                      RoutesAvailable.projectStructurePersonBaseFunction.to(
                        person.projectId,
                        person.id
                      ),
                  })
                }
              />
            ))
          ) : (
            <span className="text-xs opacity-50">Nenhum personagem criado</span>
          )}
        </div>

        {/* <Editor editor={Editors.centralIdia.editor} /> */}
      </main>
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  );
}
