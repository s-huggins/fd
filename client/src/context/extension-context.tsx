import React, { useContext, useEffect, useState } from 'react';
import { ToggleThemeCommand } from '../common/messages/commands/toggle-theme-command';
import { useMessenger } from '../hooks/useMessenger';
import { ExtensionStorage } from '../storage/extension-storage';
import { EXTENSION_ENABLED_KEY, EXTENSION_THEME_KEY } from '../storage/keys';
import { AppThemeEnum } from './app-theme.enum';

interface IExtensionContext {
  hydrated: boolean;
  extensionEnabled: boolean;
  enableExtension: () => Promise<void>;
  disableExtension: () => Promise<void>;
  theme: AppThemeEnum;
  setTheme: (theme: AppThemeEnum) => void;
  getIsDark: () => boolean;
}

const DEFAULT_EXTENSION_CONTEXT: IExtensionContext = {
  hydrated: false,
  extensionEnabled: false,
  enableExtension: async () => {},
  disableExtension: async () => {},
  theme: AppThemeEnum.Dark,
  setTheme: (theme: AppThemeEnum) => {},
  getIsDark: () => true
};

const ExtensionContext = React.createContext(DEFAULT_EXTENSION_CONTEXT);
export const useExtensionContext = () => useContext(ExtensionContext);

export const ExtensionContextProvider: React.FC = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(DEFAULT_EXTENSION_CONTEXT.hydrated);
  const [extensionTheme, setExtensionTheme] = useState<AppThemeEnum>(DEFAULT_EXTENSION_CONTEXT.theme);
  const [extensionEnabled, setExtensionEnabled] = useState<boolean>(DEFAULT_EXTENSION_CONTEXT.extensionEnabled);

  useMessenger<ToggleThemeCommand>((message: ToggleThemeCommand) => {
    setExtensionTheme(message.newTheme);
  }, ToggleThemeCommand.isToggleThemeCommand);

  const { sendMessage: sendToggleThemeMessage } = useMessenger<ToggleThemeCommand>();

  const hydrateFromStorage = async () => {
    const extensionEnabled: boolean = await ExtensionStorage.get(EXTENSION_ENABLED_KEY);
    const extensionTheme: AppThemeEnum = await ExtensionStorage.get(EXTENSION_THEME_KEY);
    setExtensionEnabled(extensionEnabled);
    setExtensionTheme(extensionTheme);
    setHydrated(true);
  };

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  const setExtensionActiveStatus = async (active: boolean) => {
    setExtensionEnabled(active);
    await ExtensionStorage.set(EXTENSION_ENABLED_KEY, active);
  };
  const enableExtension = () => setExtensionActiveStatus(true);
  const disableExtension = () => setExtensionActiveStatus(false);

  const setTheme = async (theme: AppThemeEnum) => {
    await ExtensionStorage.set(EXTENSION_THEME_KEY, theme);
    setExtensionTheme(theme);
    sendToggleThemeMessage(new ToggleThemeCommand(theme));
  };

  const getIsDark = (): boolean => {
    return extensionTheme === AppThemeEnum.Dark;
  };

  const context: IExtensionContext = {
    hydrated,
    extensionEnabled,
    enableExtension,
    disableExtension,
    theme: extensionTheme,
    setTheme,
    getIsDark
  };

  return <ExtensionContext.Provider value={context}>{hydrated && children}</ExtensionContext.Provider>;
};
