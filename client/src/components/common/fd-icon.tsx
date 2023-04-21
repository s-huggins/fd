import React, { FC } from 'react';
import { useLibraryIconUrl } from '../../hooks/useIcon';

export interface IFDIconProps extends React.HTMLAttributes<HTMLImageElement> {}

export const FDIcon: FC<IFDIconProps> = ({ ...props }) => {
  const iconUrl = useLibraryIconUrl();

  return <img src={iconUrl} alt="Frontdoor icon" {...props} />;
};
