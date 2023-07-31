import { cva } from 'class-variance-authority';

export const blockEditorTitleStyles = cva(
  ['text-start flex gap-3 leading-none items-center font-bold uppercase '],
  {
    variants: {
      theme: {
        dark: ['text-text300/50'],
        light: ['text-text800/40'],
      },
    },
  }
);

export const hoverContentStyles = cva(
  [
    'relative max-w-sm p-2 z-50 rounded-sm border border-purple900 shadow-lg shadow-semiTransparentBack',
  ],
  {
    variants: {
      theme: {
        dark: ['bg-gray200'],
        light: ['bg-gray800'],
      },
    },
  }
);

export const hoverInnerContentStyles = cva(['text-xs text-justify font-bold'], {
  variants: {
    theme: {
      dark: ['text-text300/80'],
      light: ['text-text800/80'],
    },
  },
});
