import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

window.electron.ipcRenderer.once('clear-temp-editor', () => {
  Object.keys(localStorage).forEach((key) => {
    if (/^@ms-editor-temp-persistence/.test(key)) {
      localStorage.removeItem(key)
    }
  })
})
