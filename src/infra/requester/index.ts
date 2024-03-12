import { RequestError } from '@shared/core/errors/RequestError'
import { StatusCode } from '@shared/core/types/StatusCode'
import { ipcMain } from 'electron'
import { AppWindow } from 'src/main/view/AppWindow'
import { Resolver } from './resolver'

const { appWindow } = AppWindow

ipcMain.handle(Resolver.key, async (e, data) => {
  try {
    return await Resolver.handler(e, data, appWindow)
  } catch (error) {
    console.error(error)

    if (error instanceof RequestError) {
      return {
        title: error.title,
        message: error.message,
        status: error.status,
        errors: { ...error.details },
      }
    }

    return {
      title: 'Erro interno',
      message:
        'Ocorreu um erro interno. Por favor, tente novamente, ou contate o suporte',
      status: StatusCode.INTERNAL_SERVER_ERROR,
    }
  }
})
