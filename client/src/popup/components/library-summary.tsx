import React, { FC } from 'react';
import { HorizontalRule } from '../../components/common/horizontal-rule';
import { Timestamp } from '../../components/common/timestamp';
import { Summary } from '../../components/summary';
import { SummaryHighlight } from './summary-highlight';

export interface ISummaryProps {
  content: string;
  tags: string[];
  createdAt: Date;
  highlightedText: string;
}

export const LibrarySummary: FC<ISummaryProps> = ({ content, tags, createdAt, highlightedText }) => {
  return (
    <div>
      <SummaryHighlight highlightedText={highlightedText} />
      <Summary content={content} tags={tags} />
      <div className="flex justify-end">
        <Timestamp timestamp={createdAt} />
      </div>
      <HorizontalRule />
    </div>
  );
};
