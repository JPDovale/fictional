import { cva } from 'class-variance-authority'

export const personNavStyles = cva(
  [
    'ease-in-out duration-300 h-screen backdrop:blur-lg shadow-xl shadow-black fixed top-0 pt-10  right-0 mr-1',
  ],
  {
    variants: {
      isOpen: {
        true: ['min-w-[16rem] max-w-[16rem]'],
        false: ['min-w-[3.5rem] max-w-[3.5rem] '],
      },

      theme: {
        dark: ['bg-gray300/40'],
        light: ['bg-gray500/70'],
      },
    },
  },
)

export const avatarStyles = cva(
  [
    'ease-in-out duration-300 bg-transparent mx-auto flex items-center justify-center rounded-full overflow-hidden mt-4 border border-purple900',
  ],
  {
    variants: {
      isOpen: {
        true: ['max-w-[12rem] min-w-[12rem] max-h-[12rem] min-h-[12rem]'],
        false: [
          'max-w-[2.75rem] min-w-[2.75rem] max-h-[2.75rem] min-h-[2.75rem]',
        ],
      },
    },
  },
)

export const avatarImageStyles = cva(
  [
    'ease-in-out duration-300  object-cover flex items-center justify-center  bg-transparent overflow-hidden',
  ],
  {
    variants: {
      isOpen: {
        true: ['min-w-[12rem] min-h-[12rem]'],
        false: [' min-w-[2.75rem]  min-h-[2.75rem]'],
      },
    },
  },
)
