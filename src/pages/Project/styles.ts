import { cva } from 'class-variance-authority';

export const overlayImageStyles = cva(
  ['absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t to-transparent '],
  {
    variants: {
      theme: {
        dark: [' from-gray100 via-gray100/80'],
        light: [' from-gray900 via-gray900/50'],
      },
    },
  }
);

