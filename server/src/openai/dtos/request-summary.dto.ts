import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RequestSummaryInput {
  @Field(() => String)
  text: string;
}
