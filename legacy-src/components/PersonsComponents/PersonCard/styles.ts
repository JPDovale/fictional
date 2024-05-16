import { cva } from 'class-variance-authority'

export const personCardStyles = cva(
  [
    'border-b p-2 flex flex-col items-center border-b-purple900 shadow-xl rounded-br-md rounded-bl-md ease-in-out duration-300  hover:scale-[103%] focus:scale-[103%]',
  ],
  {
    variants: {
      theme: {
        dark: ['shadow-purple700 hover:shadow-black focus:shadow-black'],
        light: [
          'shadow-semiTransparentBack hover:shadow-purple500 focus:shadow-purple500',
        ],
      },
    },
  },
)
