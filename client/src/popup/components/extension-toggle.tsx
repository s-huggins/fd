import clsx from 'clsx';
import React, { FC } from 'react';
import { ToggleExtensionCommand } from '../../common/messages/commands/toggle-extension-command';
import { Switch } from '../../components/common/switch';
import { useAppContext } from '../../context/app-context';
import { useMessenger } from '../../hooks/useMessenger';

export interface IExtensionToggleProps extends React.HTMLAttributes<HTMLLabelElement> {}

export const ExtensionToggle: FC<IExtensionToggleProps> = ({ className }) => {
  const { extensionActive, setExtensionActive } = useAppContext();
  const { sendMessage } = useMessenger();
  const handleExtensionToggled = (extensionActive: boolean) => {
    setExtensionActive(extensionActive);
    sendMessage(new ToggleExtensionCommand(extensionActive));
  };

  return (
    <label className={clsx('inline-flex items-center', className)}>
      <span
        className={clsx(
          'w-20 pr-2 inline-block flex justify-center items-center cursor-pointer',
          extensionActive && 'text-dark-highlight'
        )}
      >
        {extensionActive ? 'Enabled' : 'Disabled'}
      </span>
      <Switch checked={extensionActive} onToggle={handleExtensionToggled} />
    </label>
  );
};
