import { cva } from 'class-variance-authority';

export const mainStyles = cva([], {
  variants: {
    theme: {
      dark: ['bg-gray100', 'text-text100'],
      light: ['bg-gray900', 'text-text800'],
    },
  },
});
