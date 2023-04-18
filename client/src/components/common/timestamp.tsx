import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';

const timestampClasses = cva(
  [
    // defaults
    'text-sm',
    'p-1'
  ],
  {
    variants: {
      theme: {
        dark: ['text-dark-text'],

        light: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ]
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface ITimestampProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof timestampClasses> {
  timestamp: Date;
}

export const Timestamp: FC<ITimestampProps> = ({ timestamp, className, ...props }) => {
  const { theme } = useAppContext();
  return (
    <span className={timestampClasses({ theme, className })} {...props}>
      {timestamp.toDateString()}
    </span>
  );
};
