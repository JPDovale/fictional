import fs from 'node:fs';
import path from 'node:path';
import webpackPaths from '../configs/webpack.paths';

export default function copyMigrations() {
  if (
    !fs.existsSync(path.join(webpackPaths.srcPath, 'infra', 'database', 'migrations'))
  ) {
    throw new Error('Migrations of db does not prided ');
  }

  fs.cpSync(
    path.join(webpackPaths.srcPath, 'infra', 'database', 'migrations'),
    path.join(webpackPaths.distMainPath, 'migrations'),
    { recursive: true }
  );
}
