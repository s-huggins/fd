import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';
import { useExtensionContext } from '../../context/extension-context';

const timestampClasses = cva(['text-sm', 'p-1'], {
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

export interface ITimestampProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof timestampClasses> {
  timestamp: Date;
}

export const Timestamp: FC<ITimestampProps> = ({ timestamp, className, ...props }) => {
  const { theme } = useExtensionContext();
  return (
    <span className={timestampClasses({ theme, className })} {...props}>
      {timestamp.toDateString()}
    </span>
  );
};
