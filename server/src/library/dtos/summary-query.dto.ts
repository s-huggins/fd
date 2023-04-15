import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

export enum SortOrderEnum {
  NewestFirst = -1,
  OldestFirst = 1
}

export const SUMMARY_PAGE_SIZE: number = 10;

registerEnumType(SortOrderEnum, { name: 'CreatedAtSortOrder' });

@InputType()
export class SummaryQueryInput {
  @Field(type => Int, { defaultValue: 1 })
  page: number;

  @Field(type => SortOrderEnum, { defaultValue: SortOrderEnum.NewestFirst })
  createdAtSortOrder: SortOrderEnum;

  @Field(type => [String], { defaultValue: [] })
  tagFilters: string[];
}
