import { cva } from 'class-variance-authority';

export const configContentStyle = cva(
  [
    'p-4 data-[state=open]:animate-contentShow absolute w-[30%] h-[70%] top-[50%] left-[50%] translate-x-[-50%] rounded-md border border-purple900 shadow-2xl shadow-black translate-y-[-50%] z-[101]',
  ],
  {
    variants: {
      theme: {
        dark: ['text-text100 bg-gray100'],
        light: ['text-text800 bg-gray900'],
      },
    },
  }
);
