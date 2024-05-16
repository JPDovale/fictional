import { cva } from 'class-variance-authority'

export const navigationStyles = cva(
  [
    'flex',
    'flex-col',
    'h-screen',
    'border-r-[1px]',
    'ease-in-out',
    'duration-300',
    'px-0.5',
  ],
  {
    variants: {
      navIsOpen: {
        true: ['w-[16%] '],
        false: ['w-[4%]'],
      },

      theme: {
        dark: ['bg-gray200', 'border-r-purple100'],
        light: ['bg-gray800', 'border-r-purple900'],
      },
    },

    defaultVariants: {
      navIsOpen: true,
    },
  },
)
