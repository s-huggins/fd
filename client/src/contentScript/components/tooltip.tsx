import clsx from 'clsx';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { useClickPositionRef } from '../../hooks/useClickPositionRef';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import './tooltip.css';

interface ITooltipProps {
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
}

export const Tooltip: FC<ITooltipProps> = ({ tooltipOpen, setTooltipOpen, children }) => {
  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  const clickCoordinatesRef = useClickPositionRef();

  const positionTooltip = () => {
    if (clickCoordinatesRef?.current?.pagePosition) {
      const { x, y } = clickCoordinatesRef.current.pagePosition;
      tooltipContainerRef.current.style.left = `${x}px`;
      tooltipContainerRef.current.style.top = `${y}px`;
    }
  };

  useLayoutEffect(() => {
    positionTooltip();
  });

  return (
    <div className={clsx('absolute', !tooltipOpen && 'hidden')} ref={tooltipContainerRef}>
      <Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent className="Popover">{children}</PopoverContent>
      </Popover>
    </div>
  );
};
