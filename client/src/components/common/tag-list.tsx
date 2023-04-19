import React, { FC } from 'react';
import { FlexList } from './flex-list';
import { Tag } from './tag';

interface ITagListProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: string[];
}

export const TagList: FC<ITagListProps> = ({ tags, className, ...props }) => {
  return (
    <FlexList
      className="mb-2"
      data={tags}
      keyExtractor={(tag: string) => tag}
      renderer={(tag: string) => <Tag tag={tag} {...props} />}
    />
  );
};
