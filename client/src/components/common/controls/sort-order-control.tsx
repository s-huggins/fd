import clsx from 'clsx';
import React, { FC } from 'react';
import { CreatedAtSortOrder } from '../../../gql/graphql';

interface ISortOrderControlProps {
  sortOrder: CreatedAtSortOrder;
  onSortOrderChanged: (newSortOrder: CreatedAtSortOrder) => void;
}

export const SortOrderControl: FC<ISortOrderControlProps> = ({ sortOrder, onSortOrderChanged }) => {
  const handleSortDirectionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder: CreatedAtSortOrder = CreatedAtSortOrder[event.target.value];
    onSortOrderChanged(newSortOrder);
  };

  const sortingNewestFirst: boolean = sortOrder === CreatedAtSortOrder.NewestFirst;

  return (
    <div>
      <label
        htmlFor="newest-first-radio"
        className={clsx('px-6 cursor-pointer', sortingNewestFirst && 'text-dark-highlight')}
      >
        Newest
        <input
          id="newest-first-radio"
          type="radio"
          name="sort"
          checked={sortingNewestFirst}
          value={CreatedAtSortOrder.NewestFirst}
          onChange={handleSortDirectionChanged}
          className="pl-2 hidden"
        />
      </label>
      <label
        htmlFor="oldest-first-radio"
        className={clsx('px-2 cursor-pointer', !sortingNewestFirst && 'text-dark-highlight')}
      >
        Oldest
        <input
          id="oldest-first-radio"
          type="radio"
          name="sort"
          checked={!sortingNewestFirst}
          value={CreatedAtSortOrder.OldestFirst}
          onChange={handleSortDirectionChanged}
          className="pl-2 hidden"
        />
      </label>
    </div>
  );
};
