import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import React, { FC } from 'react';
import { AppThemeEnum } from '../../../context/app-theme.enum';
import { useExtensionContext } from '../../../context/extension-context';
import { CreatedAtSortOrder } from '../../../gql/graphql';

const sortControlClasses = cva(['px-3', 'cursor-pointer'], {
  variants: {
    theme: {
      [AppThemeEnum.Dark]: [],
      [AppThemeEnum.Light]: []
    },
    active: {
      true: [],
      false: []
    }
  },
  defaultVariants: {
    theme: AppThemeEnum.Dark
  },
  compoundVariants: [
    {
      theme: AppThemeEnum.Dark,
      active: true,
      class: 'text-dark-highlight'
    },
    {
      theme: AppThemeEnum.Dark,
      active: false,
      class: 'text-dark-text'
    },
    {
      theme: AppThemeEnum.Light,
      active: true,
      class: 'text-light-highlight'
    },
    {
      theme: AppThemeEnum.Light,
      active: false,
      class: 'text-light-text'
    }
  ]
});

interface ISortOrderControlProps extends VariantProps<typeof sortControlClasses> {
  sortOrder: CreatedAtSortOrder;
  onSortOrderChanged: (newSortOrder: CreatedAtSortOrder) => void;
}

export const SortOrderControl: FC<ISortOrderControlProps> = ({ sortOrder, onSortOrderChanged }) => {
  const { theme } = useExtensionContext();

  const handleSortDirectionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder: CreatedAtSortOrder = CreatedAtSortOrder[event.target.value];
    onSortOrderChanged(newSortOrder);
  };

  const sortingNewestFirst: boolean = sortOrder === CreatedAtSortOrder.NewestFirst;

  return (
    <div>
      <label htmlFor="newest-first-radio" className={clsx(sortControlClasses({ theme, active: sortingNewestFirst }))}>
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
      <label htmlFor="oldest-first-radio" className={clsx(sortControlClasses({ theme, active: !sortingNewestFirst }))}>
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
