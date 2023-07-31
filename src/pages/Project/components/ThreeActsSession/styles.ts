import { cva } from 'class-variance-authority';

export const previewThreeActsStyles = cva(
  [
    'min-w-[45rem] max-w-[45rem] max-h-[16rem] overflow-hidden py-2 prose prose-purple prose-sm ',
  ],
  {
    variants: {
      theme: {
        dark: ['prose-invert'],
        light: [],
      },
    },
  }
);
