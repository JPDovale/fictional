import { Requester } from '@config/requests/requester';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useInterface } from '@store/Interface';
import { useRoutes } from '@store/Routes';

function commandK() {
  const { handleChangeOpenCommandK } = useInterface.getState();
  return handleChangeOpenCommandK();
}

function newProject() {
  return useRoutes.getState().setPathname(RoutesAvailable.projects.create);
}

function home() {
  return useRoutes.getState().setPathname(RoutesAvailable.default);
}

function goBackEscape() {
  const { commandKIsOpen } = useInterface.getState();
  if (commandKIsOpen) return;

  useRoutes.getState().goBack();
}

function openDevTools() {
  return Requester.requester({
    access: 'open-dev-tools',
    data: null,
  });
}

export { commandK, newProject, home, goBackEscape, openDevTools };
