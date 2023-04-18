import React, { FC } from 'react';
import ReactSwitch from 'react-switch';
import { useAppContext } from '../../context/app-context';
import { Colours } from '../../lib/colours';

export interface ISwitchProps extends React.HTMLAttributes<HTMLSpanElement> {
  checked: boolean;
  onToggle: (newState: boolean) => void;
}

export const Switch: FC<ISwitchProps> = ({ checked, onToggle, className, ...props }) => {
  const { theme } = useAppContext();

  return (
    <span className={className} {...props}>
      <ReactSwitch
        className="block"
        height={15}
        width={30}
        onHandleColor={Colours.colors['dark-detail']}
        offHandleColor={Colours.colors['dark-detail']}
        onColor={Colours.colors['dark-highlight']}
        checked={checked}
        onChange={onToggle}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </span>
  );
};
