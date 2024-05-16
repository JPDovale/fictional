import { cva } from 'class-variance-authority'

export const projectCardStyles = cva(
  [
    'flex',
    'flex-col',
    'overflow-hidden',
    'ease-in-out',
    'duration-300',
    'hover:scale-[102%]',
    'rounded-md',
    'active:scale-[99%]',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200', 'shadow-defaultDark', 'focus:shadow-inFocusDark'],
        light: ['bg-gray800', 'shadow-default', 'focus:shadow-inFocus'],
      },
    },
  },
)

export const imageStyles = cva([
  'flex',
  'items-center',
  'justify-center',
  'w-full',
  'min-h-[160px]',
  'max-h-[160px]',
])

export const projectInfoStyles = cva(
  ['flex flex-col gap-2', 'w-full h-full p-4', 'text-start'],
  {
    variants: {
      theme: {
        dark: ['bg-gray300'],
        light: ['bg-gray700'],
      },
    },
  },
)
