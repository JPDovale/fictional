import { getDatabaseImagesPath } from '@utils/getDatabasePath'
import express from 'express'
import { Server } from 'http'
import axios from 'axios'
import { Logger } from '@utils/logger'

export class WebServer {
  static server: express.Express | null = null
  static webServer: Server | null = null
  static port = 4141
  static verifications = 0

  static listen() {
    if (!WebServer.server) return
    WebServer.webServer = WebServer.server.listen(WebServer.port, () => {
      Logger.info(`[INFO]: Web server is running on port: ${WebServer.port}`)
    })
  }

  static async start() {
    const isServerRunningOrGetFreesPort = await WebServer.getFreePort()

    if (isServerRunningOrGetFreesPort === 'retry') {
      Logger.error(
        '[ERROR]: Web server could not start. Please, try again later.',
      )
      return
    }

    if (!isServerRunningOrGetFreesPort) {
      WebServer.server = express()
      WebServer.server.use('/images', express.static(getDatabaseImagesPath()))
      WebServer.server.get('/ping', (_, res) =>
        res.status(200).send('pong:fictional'),
      )

      WebServer.listen()
    }
  }

  static async getFreePort(): Promise<boolean | 'retry'> {
    WebServer.verifications += 1
    const isRunning = await WebServer.verifyIsRunning()

    if (isRunning === 'retry' && WebServer.verifications < 11) {
      WebServer.port += 1
      return WebServer.getFreePort()
    }

    return isRunning
  }

  static async verifyIsRunning(): Promise<boolean | 'retry'> {
    try {
      Logger.info(
        `[INFO]: Verifying if web server is running to port ${WebServer.port}`,
      )
      const callingPing = await axios.get(
        `http://localhost:${WebServer.port}/ping`,
      )

      if (callingPing.data !== 'pong:fictional') {
        Logger.error(
          '[ERROR]: Web server can not be started. Port already in use',
          '[INFO]: Trying starting web server in another port',
        )

        return 'retry'
      }

      if (callingPing.status === 200 && callingPing.data === 'pong:fictional') {
        Logger.info('[INFO]: Web server already is running')
        return true
      }

      return false
    } catch {
      return false
    }
  }
}
