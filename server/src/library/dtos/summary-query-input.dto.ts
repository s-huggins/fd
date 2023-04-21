import { Field, InputType } from '@nestjs/graphql';
import { PaginatedInput } from 'src/common/dtos/paginated-input.dto';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';

@InputType()
export class SummaryQueryInput extends PaginatedInput {
  @Field(type => SortOrderEnum, { defaultValue: SortOrderEnum.NewestFirst })
  public createdAtSortOrder: SortOrderEnum = SortOrderEnum.NewestFirst;

  @Field(type => [String], { defaultValue: [] })
  public tagFilters: string[] = [];
}
