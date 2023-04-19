import { Args, Query, Resolver } from '@nestjs/graphql';
import { RequestSummaryInput, RequestSummaryOutput } from '../dtos/request-summary.dto';
import { OpenAIService } from '../services/openai.service';

@Resolver()
export class OpenAIResolver {
  constructor(private readonly _openAIService: OpenAIService) {}

  @Query(() => RequestSummaryOutput)
  public requestSummary(@Args('input') requestSummaryInput: RequestSummaryInput): Promise<RequestSummaryOutput> {
    return this._openAIService.getSummary(requestSummaryInput);
  }
}
