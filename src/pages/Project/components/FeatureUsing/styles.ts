import { cva } from 'class-variance-authority';

export const featureUsingStyles = cva(
  ['flex flex-col items-center gap-1.5  p-2 rounded-md'],
  {
    variants: {
      theme: {
        dark: ['bg-gray300 shadow-defaultDark'],
        light: ['bg-gray700 shadow-default'],
      },
    },
  }
);
