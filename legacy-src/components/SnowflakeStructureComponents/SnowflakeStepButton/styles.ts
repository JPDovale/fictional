import { cva } from 'class-variance-authority'

export const snowflakeStepButtonStyles = cva(
  ['flex p-4 rounded-md  ease-in-out duration-300 '],
  {
    variants: {
      theme: {
        dark: ['bg-gray200 shadow-defaultDark'],
        light: ['bg-gray800 shadow-default'],
      },
      disabled: {
        true: ['cursor-not-allowed opacity-50 hover:scale-[100%]'],
      },
      isClickable: {
        false: ['hover:scale-[100%] focus:scale-[100%] cursor-default'],
        true: ['hover:scale-[106%] focus:scale-[106%] focus:shadow-black'],
      },
    },
  },
)
