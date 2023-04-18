import React, { FC } from 'react';
import { useAppContext } from '../../context/app-context';
import { ISummary } from '../../context/summary.interface';
import { LibrarySummary } from './library-summary';

interface ISummaryListProps {
  summaries: ISummary[];
}

export const SummaryList: FC<ISummaryListProps> = ({ summaries }) => {
  const { theme } = useAppContext();

  return (
    <ul className="list-none m-0 p-0">
      {summaries.map((summary: ISummary) => (
        <LibrarySummary
          key={summary.id}
          content={summary.content}
          tags={summary.tags}
          createdAt={summary.createdAt}
          highlightedText={summary.highlightedText}
        />
      ))}
    </ul>
  );
};
