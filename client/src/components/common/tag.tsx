import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';

const tagClasses = cva(
  [
    // defaults
    'font-montserrat',
    'inline-block',
    'p-1',
    'px-2',
    'm-1',
    'rounded-md',
    'text-sm'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-detail', 'text-dark-highlight'],

        light: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ],
        text: ['bg-transparent', 'text-black', 'hover:bg-gray-100']
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagClasses> {
  tag: string;
}

export const Tag: FC<ITagProps> = ({ tag, className, ...props }) => {
  const { theme } = useAppContext();
  return (
    <span className={tagClasses({ theme, className })} {...props}>
      {tag}
    </span>
  );
};
