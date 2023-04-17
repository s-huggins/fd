import React, { FC } from 'react';

interface ISummaryProps {
  detail: string;
  tags: string[];
  createdAt?: Date;
}

export const Summary: FC<ISummaryProps> = ({ detail, tags, createdAt }) => {
  return (
    <>
      <p>{detail}</p>
      <ul>
        {tags.map((tag: string) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {createdAt && <span>{createdAt.toLocaleString()}</span>}
    </>
  );
};
