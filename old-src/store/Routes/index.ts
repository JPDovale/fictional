import { localStorageKeys } from '@config/localStorage/keys';
import { historyConfig } from '@config/navigation/history';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useInterface } from '@store/Interface';
import { create } from 'zustand';

export interface SetPathnameParams {
  routerParameterized: string;
}

interface Routes {
  history: string[];
  pathname: string;
  isParametrizedRouter: boolean;
  routerUnParameterized: string | null;
  indexAndParams: { [x: number]: string }[];

  setPathname: (newState: string | SetPathnameParams) => void;
  recoveryHistory: () => void;
  goBack: () => void;
}

const useRoutes = create<Routes>((set, get) => ({
  history: [],
  pathname: '/',
  isParametrizedRouter: false,
  routerUnParameterized: null,
  indexAndParams: [],

  /**
   *
   * @param newRoute
   * String or route parametrized with param and default route
   * Exemple: /project/1234-1234-1234-1234^^//^^/project/:id
   *
   * The string ^^//^^ is one diver allocated on RoutesAvailable file
   */
  setPathname: (
    newRoute = {
      routerParameterized: '',
    }
  ) => {
    if (useInterface.getState().commandKIsOpen) {
      useInterface.getState().setCommandKIsOpen(false);
    }

    if (typeof newRoute === 'string') {
      const newHistory = upToHistoryNavigation(newRoute);

      set({
        pathname: newRoute,
        isParametrizedRouter: false,
        routerUnParameterized: null,
        indexAndParams: [],
        history: newHistory,
      });
    } else {
      const finalPathname = newRoute.routerParameterized?.split(
        RoutesAvailable.divider
      )[0];

      const routerUnParameterized = newRoute.routerParameterized?.split(
        RoutesAvailable.divider
      )[1];

      const routeBlocks = routerUnParameterized?.split('/');
      const indexAndParams: { [x: number]: string }[] = [];

      routeBlocks?.forEach((block, i) => {
        const isBlockWithParams = block.includes(':');

        if (isBlockWithParams) {
          indexAndParams.push({ [i]: block });
        }
      });

      const newHistory = upToHistoryNavigation(newRoute.routerParameterized);

      set({
        isParametrizedRouter: true,
        pathname: finalPathname,
        indexAndParams,
        history: newHistory,
      });
    }
  },

  recoveryHistory: () => {
    const savedHistory: string[] = JSON.parse(
      localStorage.getItem(localStorageKeys.navigationHistory) ?? '[]'
    );

    set({
      history: savedHistory,
    });

    const lastPath = savedHistory[savedHistory.length - 1];

    if (lastPath) {
      if (lastPath.includes(RoutesAvailable.divider)) {
        useRoutes.getState().setPathname({
          routerParameterized: lastPath,
        });
      } else {
        useRoutes.getState().setPathname(lastPath);
      }
    }
  },

  goBack: () => {
    const { history } = get();
    const historyLength = history.length;

    const slicedHistoryNewHistory = history.slice(0, historyLength - 2);
    const goTo = history[historyLength - 2];

    set({
      history: slicedHistoryNewHistory,
    });

    if (goTo) {
      if (goTo.includes(RoutesAvailable.divider)) {
        useRoutes.getState().setPathname({
          routerParameterized: goTo,
        });
      } else {
        useRoutes.getState().setPathname(goTo);
      }
    } else {
      useRoutes.getState().setPathname('/');
    }
  },
}));

function upToHistoryNavigation(newRoute: string) {
  const { history } = useRoutes.getState();
  const lengthOfHistory = history.length;
  const lastPath = history[lengthOfHistory - 1];

  if (lastPath !== newRoute) {
    history.push(newRoute);
  }

  if (lengthOfHistory >= historyConfig.length) {
    history.shift();
  }

  localStorage.setItem(
    localStorageKeys.navigationHistory,
    JSON.stringify(history)
  );

  return history;
}

export { useRoutes };
