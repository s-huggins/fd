import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';

const buttonClasses = cva(
  [
    // defaults
    'font-montserrat',
    'p-1',
    ,
    'px-2',
    'rounded-md',
    'cursor-pointer',
    'm-1'
    // 'text-sm'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-detail', 'text-dark-text', 'hover:text-dark-highlight'],

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

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => {
  const { theme } = useAppContext();
  return (
    <button className={buttonClasses({ theme, className })} {...props}>
      {children}
    </button>
  );
};
