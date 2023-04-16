import { useEffect, useRef } from 'react';
import { IPoint } from '../common/interfaces/point.interface';

export interface ICursorData {
  pagePosition?: IPoint;
}

export const useClickPositionRef = () => {
  const cursorCoordinates = useRef<ICursorData>({ pagePosition: null });

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      cursorCoordinates.current = {
        pagePosition: {
          x: event.pageX,
          y: event.pageY
        }
      };
    };
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  });

  return cursorCoordinates;
};
