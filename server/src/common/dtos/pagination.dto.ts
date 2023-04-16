import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationFields {
  @Field(type => Int)
  page: number;

  @Field(type => Int)
  itemsPerPage: number;

  @Field(type => Int)
  totalPages: number;
}
