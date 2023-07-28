import { cva } from 'class-variance-authority';

export const projectHeaderStyles = cva(
  ['p-2 py-2.5 flex items-center gap-0.5 fixed w-full top-0 z-50'],
  {
    variants: {
      theme: {
        dark: ['bg-gray200'],
        light: ['bg-gray800 shadow-sm shadow-semiTransparentBack'],
      },
    },
  }
);

export const pathOnHeaderStyles = cva([
  'text-sm leading-none font-bold opacity-70',
]);

export const divider = cva(['font-bold opacity-30 text-lg leading-none']);
