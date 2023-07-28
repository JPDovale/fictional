import path from 'node:path';
import os from 'node:os';

export function getDatabasePath() {
  return process.env.NODE_ENV === 'production'
    ? path.join(
        os.homedir(),
        'AppData',
        'Local',
        'Programs',
        'Magiscrita',
        'database'
      )
    : path.join(__dirname, '..', '..', '..', 'database');
}
