import { cva } from 'class-variance-authority';

export const editorStyles = cva(
  ['min-w-[45rem] max-w-[45rem] prose prose-purple prose-sm'],
  {
    variants: {
      theme: {
        dark: ['prose-invert'],
        light: [],
      },
    },
  }
);
