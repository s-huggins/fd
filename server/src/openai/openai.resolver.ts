import { Args, Query, Resolver } from '@nestjs/graphql';
import { OpenAISummary } from './dtos/openai-summary.dto';
import { SummaryRequestInput } from './dtos/summary-request.dto';
import { OpenAIService } from './openai.service';

@Resolver()
export class OpenAIResolver {
  constructor(private readonly _openAIService: OpenAIService) {}

  @Query(() => OpenAISummary)
  public requestSummary(@Args('input') summaryRequestInput: SummaryRequestInput): Promise<OpenAISummary> {
    return this._openAIService.getSummary(summaryRequestInput);
  }
}
