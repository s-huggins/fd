import clsx from 'clsx';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { useAppContext } from '../../context/app-context';
import { useClickPositionRef } from '../../hooks/useClickPositionRef';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const Tooltip: FC = ({ children }) => {
  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  const clickCoordinatesRef = useClickPositionRef();

  const { tooltipOpen, setTooltipOpen } = useAppContext();

  const positionTooltip = () => {
    if (clickCoordinatesRef?.current?.pagePosition) {
      const { x, y } = clickCoordinatesRef.current.pagePosition;
      tooltipContainerRef.current.style.left = `${x}px`;
      tooltipContainerRef.current.style.top = `${y}px`;
    }
  };

  useLayoutEffect(() => {
    positionTooltip();
  }, [tooltipOpen]);

  return (
    <div className={clsx('absolute', !tooltipOpen && 'hidden')} ref={tooltipContainerRef}>
      <Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </div>
  );
};
