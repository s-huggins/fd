import React, { FC } from 'react';
import { Tag } from './tag';

interface ITagListProps {
  tags: string[];
}

export const TagList: FC<ITagListProps> = ({ tags }) => {
  return (
    <ul className="list-none m-0 p-0 flex flex-wrap">
      {tags.map((tag: string) => (
        <li className="m-0 p-0" key={tag}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
