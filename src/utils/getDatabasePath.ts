import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'

export function getDatabasePath() {
  const linuxBase = path.join(os.homedir(), 'fictional')
  const linuxDatabase = path.join(linuxBase, 'database')

  if (process.env.NODE_ENV !== 'production') {
    return path.join(__dirname, '..', '..', 'database')
  }

  if (process.platform === 'linux') {
    if (!fs.existsSync(linuxBase)) {
      fs.mkdirSync(linuxBase, { recursive: true })
    }

    return linuxDatabase
  }

  return path.join(
    os.homedir(),
    'AppData',
    'Local',
    'Programs',
    'Fictional',
    'database',
  )
}

export function getDatabaseImagesPath() {
  return path.join(getDatabasePath(), 'images')
}
