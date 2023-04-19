import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginatedInput {
  @Field(type => Int, { defaultValue: 1 })
  public page: number = 1;

  @Field(type => Int, { defaultValue: 10 })
  public itemsPerPage: number = 10;
}
