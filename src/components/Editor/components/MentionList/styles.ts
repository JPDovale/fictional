import { cva } from 'class-variance-authority';

export const mentionListStyles = cva(
  [
    'min-w-[18rem]  flex flex-col gap-0.5 border-purple900 border p-1 rounded-md shadow-xl',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200'],
        light: ['bg-gray800'],
      },
    },
  }
);

export const mentionSelectStyles = cva(
  [
    'flex leading-none px-2 py-0.5  text-xs items-center gap-2 rounded-md ease-in-out duration-300',
  ],
  {
    variants: {
      theme: {
        dark: ['text-text100 hover:bg-gray400 focus:bg-gray400'],
        light: ['text-text800 hover:bg-gray600 focus:bg-gray600'],
      },
    },
  }
);
