import React, { FC } from 'react';
import ReactSwitch from 'react-switch';
import { AppThemeEnum } from '../../context/app-theme.enum';
import { useExtensionContext } from '../../context/extension-context';
import { Colours } from '../../lib/colours';

export interface ISwitchProps extends React.HTMLAttributes<HTMLSpanElement> {
  checked: boolean;
  onToggle: (newState: boolean) => void;
}

const switchColors = {
  onHandleColor: {
    [AppThemeEnum.Dark]: Colours.colors['dark-detail'],
    [AppThemeEnum.Light]: Colours.colors['dark-detail']
  },
  offHandleColor: {
    [AppThemeEnum.Dark]: Colours.colors['dark-detail'],
    [AppThemeEnum.Light]: Colours.colors['dark-detail']
  },
  onColor: {
    [AppThemeEnum.Dark]: Colours.colors['dark-highlight'],
    [AppThemeEnum.Light]: Colours.colors['light-contrast']
  }
};

export const Switch: FC<ISwitchProps> = ({ checked, onToggle, className, ...props }) => {
  const { theme } = useExtensionContext();

  return (
    <span className={className} {...props}>
      <ReactSwitch
        className="block"
        height={15}
        width={30}
        onHandleColor={switchColors.onHandleColor[theme]}
        offHandleColor={switchColors.offHandleColor[theme]}
        onColor={switchColors.onColor[theme]}
        checked={checked}
        onChange={onToggle}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </span>
  );
};
