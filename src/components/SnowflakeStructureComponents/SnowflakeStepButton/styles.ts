import { cva } from 'class-variance-authority';

export const snowflakeStepButtonStyles = cva(
  [
    'flex p-4 rounded-md  ease-in-out duration-300 hover:scale-[106%] focus:scale-[106%] focus:shadow-black',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200 shadow-defaultDark'],
        light: ['bg-gray800 shadow-default'],
      },
      disabled: {
        true: ['cursor-not-allowed opacity-50 hover:scale-[100%]'],
      },
    },
  }
);
