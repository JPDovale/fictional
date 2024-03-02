import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

export function getDatabasePath() {
  const linuxSnap = path.join(os.homedir(), 'snap');
  const linuxBase = path.join(linuxSnap, 'magiscrita');
  const linuxDatabase = path.join(linuxBase, 'database');

  if (process.env.NODE_ENV !== 'production') {
    return path.join(__dirname, '..', '..', '..', 'database');
  }

  if (process.platform === 'linux') {
    if (!fs.existsSync(linuxSnap)) {
      fs.mkdirSync(linuxSnap);
    }

    if (!fs.existsSync(linuxBase)) {
      fs.mkdirSync(linuxBase);
    }

    return linuxDatabase;
  }

  return path.join(
    os.homedir(),
    'AppData',
    'Local',
    'Programs',
    'Magiscrita',
    'database'
  );
}

export function getDatabaseImagesPath() {
  return path.join(getDatabasePath(), 'images');
}
