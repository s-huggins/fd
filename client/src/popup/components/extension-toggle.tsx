import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import React, { FC } from 'react';
import { ToggleExtensionCommand } from '../../common/messages/commands/toggle-extension-command';
import { Switch } from '../../components/common/switch';
import { useExtensionContext } from '../../context/extension-context';
import { useMessenger } from '../../hooks/useMessenger';

const toggleClasses = cva(['w-20 pr-2 inline-block flex justify-center items-center cursor-pointer'], {
  variants: {
    theme: {
      dark: [],
      light: []
    },
    extensionEnabled: {
      true: [],
      false: []
    }
  },
  defaultVariants: {
    theme: 'dark'
  },
  compoundVariants: [
    {
      theme: 'dark',
      extensionEnabled: true,
      class: 'text-dark-highlight'
    },
    {
      theme: 'dark',
      extensionEnabled: false,
      class: 'text-dark-text'
    },
    {
      theme: 'light',
      extensionEnabled: true,
      class: 'text-light-highlight'
    },
    {
      theme: 'light',
      extensionEnabled: false,
      class: 'text-light-text'
    }
  ]
});

export interface IExtensionToggleProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof toggleClasses> {}

export const ExtensionToggle: FC<IExtensionToggleProps> = ({ className }) => {
  const { theme, extensionEnabled, enableExtension, disableExtension } = useExtensionContext();
  const { sendMessage } = useMessenger<ToggleExtensionCommand>();

  const handleExtensionToggled = async (extensionActive: boolean) => {
    if (extensionActive) {
      await enableExtension();
    } else {
      await disableExtension();
    }
    sendMessage(new ToggleExtensionCommand(extensionActive));
  };

  return (
    <div>
      <label className={clsx('inline-flex items-center', className)}>
        <span className={clsx(toggleClasses({ theme, extensionEnabled }))}>
          {extensionEnabled ? 'Enabled' : 'Disabled'}
        </span>
        <Switch checked={extensionEnabled} onToggle={handleExtensionToggled} />
      </label>
    </div>
  );
};
