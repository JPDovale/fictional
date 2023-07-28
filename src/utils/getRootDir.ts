import path from 'node:path';

function getRootDir() {
  const { sep } = path;
  const caminhoAbsoluto = path.resolve(sep);
  const partesDoCaminho = caminhoAbsoluto.split(sep);
  return partesDoCaminho.slice(0, partesDoCaminho.length - 1).join(sep);
}

export { getRootDir };
