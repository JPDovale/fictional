/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['*/**/*.spec.ts'],
    exclude: ['node_modules', 'build', 'dist'],
    globals: true,
  },
  resolve: {
    alias: {
      '@components/': '/src/components/',
      '@contexts/': '/src/contexts/',
      '@hooks/': '/src/hooks/',
      '@pages/': '/src/pages/',
      '@services/': '/src/services/',
      '@styles/': '/src/styles/',
      '@routes/': '/src/routes/',
      '@layouts/': '/src/layouts/',
      '@utils/': '/src/utils/',
      '@config/': '/src/config/',
      '@store/': '/src/store/',
      '@modules/': '/src/modules/',
      '@shared/': '/src/shared/',
      '@env/': '/src/env/',
      '@database/': '/src/database/',
      '@providers/': '/src/providers/',
      '@tests/': '/src/tests/',
    },
  },
});
