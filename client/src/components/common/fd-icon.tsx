import React, { FC } from 'react';
import { useIcon } from '../../hooks/useIcon';

export interface IFDIconProps extends React.HTMLAttributes<HTMLImageElement> {}

export const FDIcon: FC<IFDIconProps> = ({ ...props }) => {
  const iconUrl = useIcon();

  return <img src={iconUrl} alt="Frontdoor icon" {...props} />;
};
