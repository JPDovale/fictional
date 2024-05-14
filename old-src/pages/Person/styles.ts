import { cva } from 'class-variance-authority';

export const previewHistoryPersonStyles = cva(
  ['py-2 prose prose-purple prose-sm '],
  {
    variants: {
      theme: {
        dark: ['prose-invert'],
        light: [],
      },
    },
  }
);
