import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const headingClasses = cva(['font-montserrat', 'text-4xl', 'mb-2'], {
  variants: {
    theme: {
      dark: ['text-dark-highlight'],

      light: ['text-black']
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
});

export interface IHeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingClasses> {}

export const Heading: FC<IHeadingProps> = ({ children, className, ...props }) => {
  const { theme } = useExtensionContext();
  return (
    <h1 className={headingClasses({ theme, className })} {...props}>
      {children}
    </h1>
  );
};
