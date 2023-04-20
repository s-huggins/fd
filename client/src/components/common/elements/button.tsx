import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const buttonClasses = cva(['font-montserrat', 'p-1', 'px-2', 'rounded-md', 'cursor-pointer', 'm-1'], {
  variants: {
    theme: {
      dark: ['bg-dark-detail', 'text-dark-text', 'hover:text-dark-highlight'],

      light: ['bg-light-detail', 'text-light-text', 'hover:text-light-highlight']
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
});

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => {
  const { theme } = useExtensionContext();
  return (
    <button className={buttonClasses({ theme, className })} {...props}>
      {children}
    </button>
  );
};
