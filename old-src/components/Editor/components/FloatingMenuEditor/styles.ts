import { cva } from 'class-variance-authority'

export const floatingMenuStyles = cva(
  [
    'shadow-lg border shadow-semiTransparentBack rounded-md overflow-hidden flex flex-col p-2 gap-1',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray300 border-gray400'],
        light: ['bg-gray700 border-gray600'],
      },
    },
  },
)

export const menuOptionWrapperStyles = cva(
  [
    'flex gap-2 items-center justify-between min-w-[280px] ease-in-out duration-300 rounded-md ',
  ],
  {
    variants: {
      theme: {
        dark: ['hover:bg-gray400', 'focus:bg-gray400'],
        light: ['hover:bg-gray500', 'focus:bg-gray500'],
      },
    },
  },
)
