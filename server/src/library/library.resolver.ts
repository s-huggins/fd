import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSummaryInput, CreateSummaryOutput } from './dtos/create-summary.dto';
import { SummaryQueryInput } from './dtos/summary-query-input.dto';
import { SummaryQueryOutput } from './dtos/summary-query-output.dto';
import { LibraryService } from './library.service';

@Resolver()
export class LibraryResolver {
  constructor(private readonly _libraryService: LibraryService) {}

  @Query(() => SummaryQueryOutput)
  public getSummaries(@Args('input') summariesQuery: SummaryQueryInput): Promise<SummaryQueryOutput> {
    return this._libraryService.getSummaries(summariesQuery);
  }

  @Mutation(() => CreateSummaryOutput)
  public async createSummary(@Args('input') createSummaryInput: CreateSummaryInput): Promise<CreateSummaryOutput> {
    return this._libraryService.createSummary(createSummaryInput);
  }
}
