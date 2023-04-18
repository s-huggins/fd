import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OpenAISummary } from './openai-summary.dto';

@InputType()
export class RequestSummaryInput {
  @Field(() => String)
  text: string;
}

@ObjectType()
export class RequestSummaryOutput extends OpenAISummary {}
