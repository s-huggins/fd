import React, { FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import './tooltip.css';

interface ITooltipProps {
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
}

export const Tooltip: FC<ITooltipProps> = ({ tooltipOpen, setTooltipOpen, children }) => {
  return (
    <div>
      <Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <PopoverTrigger>
          <></>
        </PopoverTrigger>
        <PopoverContent className="Popover">{children}</PopoverContent>
      </Popover>
    </div>
  );
};
