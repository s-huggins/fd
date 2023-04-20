import React, { FC, useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Colours } from '../../lib/colours';

interface IProgressBarProps {
  loading: boolean;
}

export const ProgressBar: FC<IProgressBarProps> = ({ loading }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (loading) {
      ref.current?.continuousStart(80);
    } else {
      ref.current?.complete();
    }
  }, [loading]);

  return (
    loading && (
      <div data-testid="progress-bar" className="opacity-80">
        <LoadingBar ref={ref} color={Colours.colors['dark-highlight']} />
      </div>
    )
  );
};
