import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteSummaryInput {
  @Field(type => String)
  id: string;
}
