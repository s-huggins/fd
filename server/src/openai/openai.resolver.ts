import { Args, Query, Resolver } from '@nestjs/graphql';
import { OpenAISummary } from './dtos/openai-summary.dto';
import { RequestSummaryInput } from './dtos/request-summary.dto';
import { OpenAIService } from './openai.service';

@Resolver()
export class OpenAIResolver {
  constructor(private readonly _openAIService: OpenAIService) {}

  @Query(() => OpenAISummary)
  public requestSummary(@Args('input') requestSummaryInput: RequestSummaryInput): Promise<OpenAISummary> {
    return this._openAIService.getSummary(requestSummaryInput);
  }
}
