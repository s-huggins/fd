import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';

const loadingClasses = cva(
  [
    'font-montserrat',
    'w-32',
    'h-10',
    'p-2',
    'flex',
    'items-center',
    'text-base',
    'leading-7',
    'rounded-md',
    'shadow-dark-inner',
    'border-none'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-highlight'],
        light: ['bg-light-main', 'text-light-highlight']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface ITooltipTabProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingClasses> {}

export const TooltipTab: FC<ITooltipTabProps> = ({ children, className, ...props }) => {
  const { theme } = useExtensionContext();
  return (
    <div className={loadingClasses({ theme, className })} {...props}>
      {children}
    </div>
  );
};
