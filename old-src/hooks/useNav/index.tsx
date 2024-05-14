import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { useParams } from 'react-router-dom';
import { showHeaderInPages } from '@config/header/showHeaderInPages';
import { makePathnameFunc } from './funcs/makePathname';

const possiblesPaths = {
  projects: 'Projetos',
  ':id': () => 'name',
  structure: 'Estrutura',
  persons: 'Personagens',
  ':personId': () => 'name.fullName',
  history: 'História',
  settings: 'Configurações',
  books: 'Livros',
  ':bookId': () => 'title',
  centralIdia: 'Ideia central',
  paragraph: 'Ao paragrafo',
  personsBase: 'Sobre quem?',
  page: 'Expansão',
  text: 'Texto',
  personBaseFunction: 'Função',
  personBaseObjective: 'Objetivo',
  personBaseMotivation: 'Motivação',
  personBaseObstacle: 'Obstaculo',
  personBaseApprenticeship: 'Aprendizado',
  personBasePovByThisEye: 'Enredo pela visão desse personagem',
  personsExpansion: 'Quanto mais real, melhor',
  personExpansionFunction: 'Função',
  personExpansionObjective: 'Objetivo',
  personExpansionMotivation: 'Motivação',
  personExpansionObstacle: 'Obstaculo',
  personExpansionApprenticeship: 'Aprendizado',
  personExpansionPovByThisEye: 'Enredo pela visão desse personagem',
  interweavingPersonsAndExpansion: 'Entrelaçamento',
  personsFinal: 'Os detalhes',
};

export function useNav() {
  const { indexAndParams, setPathname, pathname } = useRoutes((state) => ({
    indexAndParams: state.indexAndParams,
    setPathname: state.setPathname,
    pathname: state.pathname,
  }));
  const { id, personId, bookId } = useParams();

  const finalParams = {
    ':id': id,
    ':personId': personId,
    ':bookId': bookId,
  };

  function makePathname(path: string) {
    return makePathnameFunc({
      pathname: path,
      finalParams,
      indexAndParams,
    });
  }

  function makeBaseUrl(path: string): string {
    const blocks = path.split('/').filter((block) => block !== '');
    let finalPath = '';

    indexAndParams.forEach((indexAndParam) => {
      const index = Number(Object.keys(indexAndParam)[0]);
      blocks[index - 1] = indexAndParam[index];
    });

    blocks.forEach((block) => {
      if (finalPath) {
        finalPath = `${finalPath}/${block}`;
      } else {
        finalPath = `/${block}`;
      }
    });

    if (!finalPath) {
      finalPath = '/';
    }

    return finalPath;
  }

  function navigate(path: string) {
    const isParametrizedRouter = path.includes(':');

    if (isParametrizedRouter) {
      let finalPath = '';

      finalPath = `${makePathname(path)}${RoutesAvailable.divider}${path}`;

      setPathname({
        routerParameterized: finalPath,
      });
    } else {
      setPathname(path);
    }
  }

  function verifyIsToShowHeader(actualPath: string): boolean {
    return showHeaderInPages.includes(makeBaseUrl(actualPath));
  }

  function makePathsOnHeaderProject() {
    const paths = makeBaseUrl(pathname)
      .split('/')
      .filter((slice) => slice !== '');

    const pathsOnHeader = paths.map(
      (path) => possiblesPaths[path as keyof typeof possiblesPaths]
    );

    return pathsOnHeader;
  }

  const isToShoeHeader = verifyIsToShowHeader(pathname);

  return {
    makePathname,
    makeBaseUrl,
    navigate,
    makePathsOnHeaderProject,
    pathname,
    indexAndParams,
    isToShoeHeader,
  };
}
