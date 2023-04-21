import { registerEnumType } from '@nestjs/graphql';

export enum SortOrderEnum {
  NewestFirst = -1,
  OldestFirst = 1
}

registerEnumType(SortOrderEnum, { name: 'CreatedAtSortOrder' });
