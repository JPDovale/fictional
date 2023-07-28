import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { useParams } from 'react-router-dom';
import { showHeaderInPages } from '@config/header/showHeaderInPages';
import { configToHandleNavigator, navigators } from '@config/navigation/links';
import { makePathnameFunc } from './funcs/makePathname';

export function useNav() {
  const { indexAndParams, setPathname, pathname } = useRoutes((state) => ({
    indexAndParams: state.indexAndParams,
    setPathname: state.setPathname,
    pathname: state.pathname,
  }));
  const { id } = useParams();

  const finalParams = {
    ':id': id,
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

  const isToShoeHeader = verifyIsToShowHeader(pathname);
  const actualBasePath = makeBaseUrl(pathname);

  const linksToShowOnNavigator =
    configToHandleNavigator.dashboardNavigatorLinks.includes(actualBasePath)
      ? navigators.dashboardNavigatorLinks
      : configToHandleNavigator.projectNavigatorLinks.includes(actualBasePath)
      ? navigators.projectNavigatorLinks
      : [];

  return {
    makePathname,
    makeBaseUrl,
    navigate,
    pathname,
    indexAndParams,
    isToShoeHeader,
    linksToShowOnNavigator,
  };
}
