import { cva } from 'class-variance-authority';
import React from 'react';
import { ProgressBar } from '../../components/common/progress-bar';
import { useAppContext } from '../../context/app-context';
import { useExtensionContext } from '../../context/extension-context';
import { ExtensionHeader } from './extension-header';
import { ExtensionToggle } from './extension-toggle';
import { Library } from './library/library';

const popupClasses = cva(
  [
    'flex',
    'flex-col',
    'w-[600px]',
    'h-[600px]',
    'font-montserrat',
    'p-4',
    'overflow-y-auto',
    'text-base',
    'leading-7',
    'shadow-dark-inner'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-text'],

        light: ['bg-light-main', 'text-light-text']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export const FrontdoorPopup: React.FC<{}> = () => {
  const { theme } = useExtensionContext();
  const { actionInFlight } = useAppContext();

  return (
    <div className={popupClasses({ theme })}>
      <ProgressBar loading={actionInFlight} />
      <ExtensionHeader className="mb-2" />
      <div className="grow flex flex-col">
        <ExtensionToggle className="mb-3" />
        <Library />
      </div>
    </div>
  );
};
