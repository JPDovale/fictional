interface MakePathnameProps {
  pathname: string;
  indexAndParams: { [x: number]: string }[];
  finalParams: { [x: string]: string | undefined };
}

export function makePathnameFunc({
  finalParams,
  indexAndParams,
  pathname,
}: MakePathnameProps): string {
  const isParametrizedRouter = pathname.includes(':');

  if (isParametrizedRouter) {
    const splicedRoute = pathname.split('/').filter((slice) => slice !== '');
    let finalPath = '';

    indexAndParams.forEach((IAP) =>
      Object.entries(IAP).forEach(([i, p]) => {
        if (splicedRoute.includes(p)) {
          splicedRoute[Number(i) - 1] = finalParams[p] as string;
        }
      })
    );

    splicedRoute.forEach((slice) => {
      if (!finalPath) {
        finalPath = `/${slice}`;
      } else {
        finalPath = `${finalPath}/${slice}`;
      }
    });

    if (!finalPath) {
      finalPath = '/';
    }

    return finalPath;
  }
  return pathname;
}
