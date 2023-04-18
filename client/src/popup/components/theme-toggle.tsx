import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Switch } from '../../components/common/switch';
import { useAppContext } from '../../context/app-context';
import { AppThemeEnum } from '../../context/app-theme.enum';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();
  const darkModeActive: boolean = theme === AppThemeEnum.Dark;

  const onToggleTheme = (toggleStatus: boolean) => {
    const updatedTheme: AppThemeEnum = toggleStatus ? AppThemeEnum.Dark : AppThemeEnum.Light;
    setTheme(updatedTheme);
  };

  return (
    <div className="flex items-center">
      <FontAwesomeIcon size="xl" icon={faSun} />
      <Switch className="mx-3 inline-block" checked={darkModeActive} onToggle={onToggleTheme} />
      <FontAwesomeIcon size="xl" icon={faMoon} />
    </div>
  );
};
