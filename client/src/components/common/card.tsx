import React, { FC } from 'react';

interface ICardProps {}

export const Card: FC<ICardProps> = ({ children }) => {
  return <div>{children}</div>;
};
