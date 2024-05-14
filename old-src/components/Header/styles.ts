import { cva } from 'class-variance-authority';

export const stylesHeader = cva(
  [
    'px-2',
    'py-4',
    'flex',
    'justify-center',
    'gap-4',
    'border-b',
    'border-b-purple900',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200', 'border-none'],
        light: ['bg-transparent', 'border-b-purple900'],
      },
    },
  }
);
