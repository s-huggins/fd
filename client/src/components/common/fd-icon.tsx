import React, { FC } from 'react';

const iconUrl = chrome.runtime.getURL('assets/icon.png');

export interface IFDIconProps extends React.HTMLAttributes<HTMLImageElement> {}

export const FDIcon: FC<IFDIconProps> = ({ ...props }) => {
  return <img src={iconUrl} {...props} />;
};
