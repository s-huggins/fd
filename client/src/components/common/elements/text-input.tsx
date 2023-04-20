import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, InputHTMLAttributes } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const inputClasses = cva(
  ['font-montserrat', 'inline-block', 'p-1', 'px-2', 'm-1', 'rounded-md', 'text-sm', 'outline-none'],
  {
    variants: {
      theme: {
        dark: ['bg-dark-detail', 'text-dark-highlight'],

        light: ['bg-white', 'text-light-contrast']
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
  const { theme } = useExtensionContext();
  return <input className={inputClasses({ theme, className })} {...props} />;
};
