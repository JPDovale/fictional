import '../infra/containers/index'
import '../infra/requester/index'
import { app } from 'electron'
import { AppWindow } from './view/AppWindow'
import { StarterDatabase } from './controller/StarterDatabase'

const { appWindow } = AppWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(() => {
    new StarterDatabase()
    AppWindow.create()

    app.on('activate', () => {
      if (appWindow === null) AppWindow.create()
    })

    return true
  })
  .catch(console.log)
