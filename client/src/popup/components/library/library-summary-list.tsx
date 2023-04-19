import React, { FC } from 'react';
import { useAppContext } from '../../../context/app-context';
import { ISummary } from '../../../context/summary.interface';
import { LibrarySummary } from './library-summary';

interface ILibrarySummaryListProps {
  summaries: ISummary[];
  onSummaryDeleted: () => void;
}

export const LibrarySummaryList: FC<ILibrarySummaryListProps> = ({ summaries, onSummaryDeleted }) => {
  const { theme } = useAppContext();

  return (
    <ul className="list-none m-0 p-0">
      {summaries.map((summary: ISummary) => (
        <LibrarySummary
          key={summary.id}
          id={summary.id}
          content={summary.content}
          tags={summary.tags}
          createdAt={summary.createdAt}
          highlightedText={summary.highlightedText}
          onSummaryDeleted={onSummaryDeleted}
        />
      ))}
    </ul>
  );
};
