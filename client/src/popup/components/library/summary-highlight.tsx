import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Text } from '../../../components/common/elements/text';
import { AppThemeEnum } from '../../../context/app-theme.enum';
import { useExtensionContext } from '../../../context/extension-context';
import { Colours } from '../../../lib/colours';

export interface ISummaryHighlightProps {
  highlightedText: string;
}

const ICON_COLOR: Record<AppThemeEnum, string> = {
  [AppThemeEnum.Dark]: Colours.colors['dark-highlight'],
  [AppThemeEnum.Light]: Colours.colors['light-highlight']
};

const HIGHLIGHT_COLOR: Record<AppThemeEnum, string> = {
  [AppThemeEnum.Dark]: Colours.colors['dark-contrast-detail'],
  [AppThemeEnum.Light]: Colours.colors['light-contrast-detail']
};

export const SummaryHighlight: FC<ISummaryHighlightProps> = ({ highlightedText }) => {
  const { theme } = useExtensionContext();

  return (
    <Text>
      <span className={clsx('font-bold', HIGHLIGHT_COLOR[theme])}>{highlightedText}</span>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="px-2" color={ICON_COLOR[theme]} />
    </Text>
  );
};
