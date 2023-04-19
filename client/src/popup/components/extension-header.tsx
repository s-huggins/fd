import clsx from 'clsx';
import React, { FC } from 'react';
import { Heading } from '../../components/common/elements/heading';
import { FDIcon } from '../../components/common/fd-icon';
import { ThemeToggle } from './theme-toggle';

export interface IExtensionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ExtensionHeader: FC<IExtensionHeaderProps> = ({ className, ...props }) => {
  return (
    <div className={clsx('flex items-center justify-between', className)} {...props}>
      <div className="flex items-center">
        <Heading className="pr-3">Frontdoor</Heading>
        <FDIcon className="h-10" />
      </div>
      <ThemeToggle />
    </div>
  );
};
