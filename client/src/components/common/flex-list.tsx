import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface IFlexListProps<T> extends React.HTMLAttributes<HTMLUListElement> {
  renderer: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  data: T[];
}

export const FlexList = <T extends unknown>({
  data,
  renderer,
  keyExtractor,
  className,
  ...props
}: IFlexListProps<T>) => {
  return (
    <ul className={clsx('list-none m-0 p-0 flex flex-wrap', className)} {...props}>
      {data.map((item: T) => (
        <li className="m-0 p-0" key={keyExtractor(item)}>
          {renderer(item)}
        </li>
      ))}
    </ul>
  );
};
