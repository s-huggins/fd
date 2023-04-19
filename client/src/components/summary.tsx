import React, { FC } from 'react';
import { Text } from './common/elements/text';
import { TagList } from './common/tags/tag-list';

export interface ISummaryProps {
  content: string;
  tags: string[];
}

export const Summary: FC<ISummaryProps> = ({ content: detail, tags }) => {
  return (
    <div>
      <Text className="mb-2">{detail}</Text>
      <TagList tags={tags} />
    </div>
  );
};
