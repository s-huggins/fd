import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../../context/app-context';

const textClasses = cva(['text-base', 'leading-7', 'font-montserrat'], {
  variants: {
    theme: {
      dark: ['text-dark-text'],

      light: [
        'bg-white',
        'text-black',
        'border-gray-400',
        'hover:bg-gray-100',
        'border-solid',
        'border-2',
        'border-gray-800'
      ]
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
});

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textClasses> {}

export const Text: FC<ITextProps> = ({ children, className, ...props }) => {
  const { theme } = useAppContext();

  return (
    <p className={textClasses({ theme, className })} {...props}>
      {children}
    </p>
  );
};
