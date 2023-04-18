import React, { FC } from 'react';
import { FDIcon } from './common/fd-icon';
import { HorizontalRule } from './common/horizontal-rule';
import { TagList } from './common/tag-list';
import { Text } from './common/text';
import { Timestamp } from './common/timestamp';

export interface ISummaryProps {
  detail: string;
  tags: string[];
  createdAt?: Date;
}

export const Summary: FC<ISummaryProps> = ({ detail, tags, createdAt }) => {
  return (
    <div>
      <FDIcon className="h-5 float-right opacity-75 mb-1" />
      <Text className="mb-2">{detail}</Text>
      <TagList tags={tags} />
      <HorizontalRule />
      {createdAt && <Timestamp timestamp={createdAt} className="float-right" />}
    </div>
  );
};
