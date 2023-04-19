import React, { FC } from 'react';
import { TagList } from './common/tag-list';
import { Text } from './common/text';

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
