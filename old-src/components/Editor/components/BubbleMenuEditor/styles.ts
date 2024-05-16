import { cva } from 'class-variance-authority'

export const bubbleMenuWrapperStyles = cva(
  [
    'shadow-lg border shadow-semiTransparentBack rounded-md overflow-hidden flex',
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

export const bubbleOptionStyles = cva(
  [
    'p-2 text-sm flex items-center justify-center gap-1.5 leading-none font-medium ease-in-out duration-300',
  ],
  {
    variants: {
      theme: {
        dark: [
          'text-text500 hover:text-text100 hover:bg-gray200 data-[active=true]:text-purple900 focus:text-text100 focus:bg-gray200',
        ],
        light: [
          'text-text700 hover:text-text800 hover:bg-gray600 focus:text-text800 focus:bg-gray600 data-[active=true]:text-purple600 ',
        ],
      },
    },
  },
)

export const GroupStyles = cva(['flex border-r '], {
  variants: {
    theme: {
      dark: ['border-r-gray400'],
      light: ['border-r-gray600'],
    },
  },
})

export const textHighlightersStyles = cva(
  [
    'mt-2 rounded-md shadow-lg shadow-semiTransparentBack overflow-x-hidden overflow-y-auto max-h-80',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray300'],
        light: ['bg-gray700'],
      },
    },
  },
)

export const highlighterOptionStyles = cva(
  [
    'p-2 min-w-[220px] text-xs flex items-center gap-2 leading-none font-medium ease-in-out duration-300',
  ],
  {
    variants: {
      theme: {
        dark: [
          'text-text500 hover:text-text100 hover:bg-gray200 data-[active=true]:text-purple900 focus:text-text100 focus:bg-gray200',
        ],
        light: [
          'text-text700 hover:text-text800 hover:bg-gray600 focus:text-text800 focus:bg-gray600 data-[active=true]:text-purple600 ',
        ],
      },
    },
  },
)
