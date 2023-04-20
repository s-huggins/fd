import clsx from 'clsx';
import React, { FC } from 'react';
import { ToggleExtensionCommand } from '../../common/messages/commands/toggle-extension-command';
import { Switch } from '../../components/common/switch';
import { useExtensionContext } from '../../context/extension-context';
import { useMessenger } from '../../hooks/useMessenger';

export interface IExtensionToggleProps extends React.HTMLAttributes<HTMLLabelElement> {}

export const ExtensionToggle: FC<IExtensionToggleProps> = ({ className }) => {
  const { extensionEnabled, enableExtension, disableExtension } = useExtensionContext();
  const { sendMessage } = useMessenger();
  const handleExtensionToggled = (extensionActive: boolean) => {
    extensionActive ? enableExtension() : disableExtension();
    sendMessage(new ToggleExtensionCommand(extensionActive));
  };

  return (
    <label className={clsx('inline-flex items-center', className)}>
      <span
        className={clsx(
          'w-20 pr-2 inline-block flex justify-center items-center cursor-pointer',
          extensionEnabled && 'text-dark-highlight'
        )}
      >
        {extensionEnabled ? 'Enabled' : 'Disabled'}
      </span>
      <Switch checked={extensionEnabled} onToggle={handleExtensionToggled} />
    </label>
  );
};
