import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';

const headingClasses = cva(
  [
    // defaults
    'font-montserrat',
    'text-4xl',
    'mb-2'
    // 'text-sm'
  ],
  {
    variants: {
      theme: {
        dark: ['text-dark-highlight'],

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

export interface IHeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingClasses> {}

export const Heading: FC<IHeadingProps> = ({ children, className, ...props }) => {
  const { theme } = useAppContext();
  return (
    <h1 className={headingClasses({ theme, className })} {...props}>
      {children}
    </h1>
  );
};
