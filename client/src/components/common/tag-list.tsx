import clsx from 'clsx';
import React, { FC } from 'react';
import { Tag } from './tag';

interface ITagListProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: string[];
}

export const TagList: FC<ITagListProps> = ({ tags, className, ...props }) => {
  return (
    <ul className={clsx('list-none m-0 p-0 flex flex-wrap', className)} {...props}>
      {tags.map((tag: string) => (
        <li className="m-0 p-0" key={tag}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
