import clsx from 'clsx';
import React, { FC } from 'react';
import { useExtensionContext } from '../../../context/extension-context';
import { ISummary } from '../../../context/summary.interface';
import { LibrarySummary } from './library-summary';

interface ILibrarySummaryListProps extends React.HTMLAttributes<HTMLUListElement> {
  summaries: ISummary[];
  onSummaryDeleted: () => void;
}

export const LibrarySummaryList: FC<ILibrarySummaryListProps> = ({
  summaries,
  onSummaryDeleted,
  className,
  ...props
}) => {
  const { theme } = useExtensionContext();

  return (
    <ul className={clsx('list-none m-0 p-0', className)} {...props}>
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
