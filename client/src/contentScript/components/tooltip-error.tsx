import { cva, VariantProps } from 'class-variance-authority';
import React, { FC } from 'react';
import { Button } from '../../components/common/elements/button';
import { FDIcon } from '../../components/common/fd-icon';
import { useAppContext } from '../../context/app-context';

const errorClasses = cva(
  [
    // defaults
    'font-montserrat',
    // 'w-60',
    'h-10',
    'p-2',
    'flex',
    'justify-between',
    'items-center',
    'text-base',
    'leading-7',
    'rounded-md',
    'shadow-dark-inner'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-highlight'],
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

export interface ITooltipErrorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof errorClasses> {
  handleDismiss: () => void;
}

export const TooltipError: FC<ITooltipErrorProps> = ({ className, handleDismiss, ...props }) => {
  const { theme } = useAppContext();

  return (
    <div className={errorClasses({ theme, className })} {...props}>
      <FDIcon className="h-6 opacity-75 inline-block mr-3" />
      <span className="w-52">Something went wrong!</span>
      <Button className="h-6 py-0 px-1" onClick={handleDismiss}>
        Dismiss
      </Button>
    </div>
  );
};
