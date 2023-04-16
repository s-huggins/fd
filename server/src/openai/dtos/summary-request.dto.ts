import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SummaryRequestInput {
  @Field(() => String)
  text: string;
}
