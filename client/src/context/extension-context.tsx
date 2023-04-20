import React, { useContext, useEffect, useState } from 'react';
import { ExtensionStorage } from '../storage/extension-storage';
import { EXTENSION_ENABLED_KEY } from '../storage/keys';

interface IExtensionContext {
  hydrated: boolean;
  extensionEnabled: boolean;
  enableExtension: () => Promise<void>;
  disableExtension: () => Promise<void>;
}

const DEFAULT_EXTENSION_CONTEXT: IExtensionContext = {
  hydrated: false,
  extensionEnabled: false,
  enableExtension: async () => {},
  disableExtension: async () => {}
};

const ExtensionContext = React.createContext(DEFAULT_EXTENSION_CONTEXT);
export const useExtensionContext = () => useContext(ExtensionContext);

export const ExtensionContextProvider: React.FC = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(DEFAULT_EXTENSION_CONTEXT.hydrated);
  const [extensionEnabled, setExtensionEnabled] = useState<boolean>(DEFAULT_EXTENSION_CONTEXT.extensionEnabled);

  const hydrateFromStorage = async () => {
    const extensionEnabled: boolean = await ExtensionStorage.get(EXTENSION_ENABLED_KEY);
    setExtensionEnabled(extensionEnabled);
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

  const context: IExtensionContext = {
    hydrated,
    extensionEnabled,
    enableExtension,
    disableExtension
  };

  return <ExtensionContext.Provider value={context}>{hydrated && children}</ExtensionContext.Provider>;
};
