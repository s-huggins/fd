import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { SortOrderControl } from '../../../components/common/controls/sort-order-control';
import { TextInput } from '../../../components/common/elements/text-input';
import { TagFilterList } from '../../../components/common/tags/tag-filter-list';
import { useAppContext } from '../../../context/app-context';
import { ILibraryPerspective } from '../../../context/app-context.interface';
import { CreatedAtSortOrder } from '../../../gql/graphql';

const incrementer = (function* () {
  let id: number = 1;
  while (true) {
    yield id++;
  }
})();

function getNextTagFilterId(): number {
  return incrementer.next().value;
}

export interface IActiveTagFilter {
  tag: string;
  id: number;
}

export const LibraryControls: FC = () => {
  const [tagFilterInput, setTagFilterInput] = useState<string>('');

  const {
    libraryContext: {
      perspective: { sortOrder, tagFilters, page },
      setPerspective
    }
  } = useAppContext();

  const handleRemoveTagFilter = (removedTagId: number) => {
    const newTagFilters: IActiveTagFilter[] = tagFilters.filter(
      (tagFilter: IActiveTagFilter) => tagFilter.id !== removedTagId
    );
    setPerspective((oldPerspective: ILibraryPerspective) => ({ ...oldPerspective, tagFilters: newTagFilters }));
  };

  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilterInput(event.target.value);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addTag();
    }
  };

  const addTag = () => {
    if (tagFilterInput) {
      const newTagFilter: IActiveTagFilter = { tag: tagFilterInput, id: getNextTagFilterId() };
      const newTagFilters: IActiveTagFilter[] = [...tagFilters, newTagFilter];
      setTagFilterInput('');
      setPerspective((oldPerspective: ILibraryPerspective) => ({ ...oldPerspective, tagFilters: newTagFilters }));
    }
  };

  const onSortOrderChanged = (newSortOrder: CreatedAtSortOrder) => {
    setPerspective((oldPerspective: ILibraryPerspective) => ({ ...oldPerspective, sortOrder: newSortOrder }));
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-around items-center mb-2">
        <div>
          <TextInput
            placeholder="Apply tag filters"
            id="tag-filter-input"
            className="w-44"
            value={tagFilterInput}
            onChange={handleFilterInputChange}
            onKeyDown={handleEnterKey}
            data-testid="tag-filter-input"
          />
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            className="dark-text-highlight cursor-pointer hover:text-dark-highlight ease-out duration-300"
            onClick={addTag}
          />
        </div>
        <SortOrderControl sortOrder={sortOrder} onSortOrderChanged={onSortOrderChanged} />
      </div>
      <TagFilterList tagFilters={tagFilters} onTagFilterRemoved={handleRemoveTagFilter} />
    </div>
  );
};
