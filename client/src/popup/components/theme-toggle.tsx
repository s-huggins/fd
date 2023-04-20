import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Switch } from '../../components/common/switch';
import { AppThemeEnum } from '../../context/app-theme.enum';
import { useExtensionContext } from '../../context/extension-context';

export const ThemeToggle = () => {
  const { theme: extensionTheme, setTheme: setExtensionTheme } = useExtensionContext();
  const darkModeActive: boolean = extensionTheme === AppThemeEnum.Dark;

  const onToggleTheme = (toggleStatus: boolean) => {
    const newTheme: AppThemeEnum = toggleStatus ? AppThemeEnum.Dark : AppThemeEnum.Light;
    setExtensionTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <FontAwesomeIcon size="xl" icon={faSun} />
      <Switch className="mx-3 inline-block" checked={darkModeActive} onToggle={onToggleTheme} />
      <FontAwesomeIcon size="xl" icon={faMoon} />
    </div>
  );
};
