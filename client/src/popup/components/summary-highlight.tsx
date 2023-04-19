import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { Text } from '../../components/common/text';
import { Colours } from '../../lib/colours';

export interface ISummaryHighlightProps {
  highlightedText: string;
}

export const SummaryHighlight: FC<ISummaryHighlightProps> = ({ highlightedText }) => {
  return (
    <Text>
      <span className="font-bold text-dark-contrast-detail">{highlightedText}</span>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="px-2" color={Colours.colors['dark-highlight']} />
    </Text>
  );
};
