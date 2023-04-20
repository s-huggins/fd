import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const textClasses = cva(['text-base', 'leading-7', 'font-montserrat'], {
  variants: {
    theme: {
      dark: ['text-dark-text'],
      light: ['text-light-text']
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
});

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textClasses> {}

export const Text: FC<ITextProps> = ({ children, className, ...props }) => {
  const { theme } = useExtensionContext();

  return (
    <p className={textClasses({ theme, className })} {...props}>
      {children}
    </p>
  );
};
