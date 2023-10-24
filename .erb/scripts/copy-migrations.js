import fs from 'fs';
import path from 'node:path';
import webpackPaths from '../configs/webpack.paths';

export default function copyMigrations() {
  if (
    !fs.existsSync(path.join(webpackPaths.srcPath, 'database', 'migrations'))
  ) {
    throw new Error('Migrations of db does not prided ');
  }

  fs.cpSync(
    path.join(webpackPaths.srcPath, 'database', 'migrations'),
    path.join(webpackPaths.distMainPath, 'migrations'),
    { recursive: true }
  );
}
