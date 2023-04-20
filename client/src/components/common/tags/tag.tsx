import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const tagClasses = cva(['font-montserrat', 'inline-block', 'p-1', 'px-2', 'm-1', 'rounded-md', 'text-sm'], {
  variants: {
    theme: {
      dark: ['bg-dark-detail', 'text-dark-highlight'],
      light: ['bg-light-detail', 'text-light-highlight']
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
});

export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagClasses> {
  tag: string;
}

export const Tag: FC<ITagProps> = ({ tag, className, ...props }) => {
  const { theme } = useExtensionContext();
  return (
    <span className={tagClasses({ theme, className })} {...props}>
      {tag}
    </span>
  );
};
