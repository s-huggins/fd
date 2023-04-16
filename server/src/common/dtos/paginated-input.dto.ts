import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginatedInput {
  @Field(type => Int, { defaultValue: 1 })
  page: number;

  @Field(type => Int, { defaultValue: 10 })
  itemsPerPage: number;
}
