import fs from 'node:fs';
import path from 'node:path';
import webpackPaths from '../configs/webpack.paths';

export default function copyOtherFiles() {
  fs.cpSync(
    path.join(webpackPaths.srcPath, 'renderer', 'updating.html'),
    path.join(webpackPaths.distRendererPath, 'updating.html')
  );
}
