import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { FlexList } from '../../components/common/flex-list';
import { Tag } from '../../components/common/tag';
import { IActiveTagFilter } from './list-controls';

interface ITagFilterList {
  tagFilters: IActiveTagFilter[];
  onTagFilterRemoved: (removedTagId: number) => void;
}

export const TagFilterList: FC<ITagFilterList> = ({ tagFilters, onTagFilterRemoved }) => {
  const renderer = (tagFilter: IActiveTagFilter) => (
    <>
      <Tag tag={tagFilter.tag} className="pr-5" />
      <FontAwesomeIcon
        icon={faXmark}
        className="cursor-pointer"
        style={{ transform: `translate(-20px, 1px)` }}
        onClick={() => onTagFilterRemoved(tagFilter.id)}
      />
    </>
  );

  return (
    <FlexList data={tagFilters} keyExtractor={(tagFilter: IActiveTagFilter) => `${tagFilter.id}`} renderer={renderer} />
  );
};
