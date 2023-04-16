import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationFields } from './pagination.dto';

@ObjectType()
export class PaginatedOutput {
  @Field(type => PaginationFields)
  pagination: PaginationFields;
}
