import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';

const hrClasses = cva(['my-3', 'h-px', 'border-none'], {
  variants: {
    theme: {
      dark: ['bg-dark-text', 'opacity-50'],
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
});

export interface IHorizontalRuleProps extends React.HTMLAttributes<HTMLHRElement>, VariantProps<typeof hrClasses> {}

export const HorizontalRule: FC<IHorizontalRuleProps> = ({ className, ...props }) => {
  const { theme } = useAppContext();
  return <hr className={hrClasses({ theme, className })} {...props} />;
};
