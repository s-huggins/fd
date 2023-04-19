import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginatedInput } from 'src/common/dtos/paginated-input.dto';

export enum SortOrderEnum {
  NewestFirst = -1,
  OldestFirst = 1
}

registerEnumType(SortOrderEnum, { name: 'CreatedAtSortOrder' });

@InputType()
export class SummaryQueryInput extends PaginatedInput {
  @Field(type => SortOrderEnum, { defaultValue: SortOrderEnum.NewestFirst })
  public createdAtSortOrder: SortOrderEnum = SortOrderEnum.NewestFirst;

  @Field(type => [String], { defaultValue: [] })
  public tagFilters: string[] = [];
}
