import React from 'react';
import { FDIcon } from '../../components/common/fd-icon';
import { TooltipTab } from './common/tooltip-tab';

export const TooltipLoading = () => {
  return (
    <TooltipTab>
      <FDIcon className="h-6 opacity-75 inline-block mr-3" />
      <span>Loading...</span>
    </TooltipTab>
  );
};
