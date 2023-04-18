import React, { FC } from 'react';

const iconUrl = chrome.runtime.getURL('assets/images/icon.png');

export interface IFDIconProps extends React.HTMLAttributes<HTMLImageElement> {}

export const FDIcon: FC<IFDIconProps> = ({ ...props }) => {
  return <img src={iconUrl} {...props} />;
};
