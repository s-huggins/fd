import React, { FC } from 'react';
import ReactSwitch from 'react-switch';

interface ISwitchProps {
  checked: boolean;
  onToggle: (newState: boolean) => void;
  label: string;
}

export const Switch: FC<ISwitchProps> = ({ checked, onToggle, label }) => {
  return (
    <label>
      <span>{label}</span>
      <ReactSwitch checked={checked} onChange={onToggle} uncheckedIcon={false} checkedIcon={false} />
    </label>
  );
};
