import path from 'path';

export function resolveUpdatingHtmlPath() {
  if (process.env.NODE_ENV === 'development') {
    return `file://${path.resolve(
      __dirname,
      '../../renderer/',
      'updating.html'
    )}`;
  }

  return `file://${path.resolve(__dirname, '../renderer/', 'updating.html')}`;
}
