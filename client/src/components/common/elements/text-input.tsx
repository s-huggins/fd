import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, InputHTMLAttributes } from 'react';
import { useAppContext } from '../../../context/app-context';

const inputClasses = cva(
  [
    // defaults
    'font-montserrat',
    'inline-block',
    'p-1',
    'px-2',
    'm-1',
    'rounded-md',
    'text-sm',
    'outline-none'
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
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface IInputProps
  extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    VariantProps<typeof inputClasses> {}

export const TextInput: FC<IInputProps> = ({ className, ...props }) => {
  const { theme } = useAppContext();
  return <input className={inputClasses({ theme, className })} {...props} />;
};
