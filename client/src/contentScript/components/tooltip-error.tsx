import React, { FC } from 'react';
import { Button } from '../../components/common/elements/button';
import { FDIcon } from '../../components/common/fd-icon';
import { Tooltip } from './tooltip';

export interface ITooltipErrorProps {
  handleDismiss: () => void;
}

export const TooltipError: FC<ITooltipErrorProps> = ({ handleDismiss }) => {
  return (
    <Tooltip>
      <FDIcon className="h-6 opacity-75 inline-block mr-3" />
      <span className="w-52">Something went wrong!</span>
      <Button className="h-6 py-0 px-1" onClick={handleDismiss}>
        Dismiss
      </Button>
    </Tooltip>
  );
};
