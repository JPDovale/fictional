import { cva } from 'class-variance-authority';

export const snowflakeStructurePreFloat = cva(
  [
    'fixed flex flex-col min-w-[18rem] shadow-xl shadow-black max-w-[18rem] h-full overflow-h-auto p-4 border border-purple400 top-8',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200 '],
        light: ['bg-gray800 '],
      },
    },
  }
);
