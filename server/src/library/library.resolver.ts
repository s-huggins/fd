import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteSummaryInput } from './dtos/delete-summary-input.dto';
import { SaveSummaryInput, SaveSummaryOutput } from './dtos/save-summary.dto';
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

  @Mutation(() => SaveSummaryOutput)
  public async saveSummary(@Args('input') saveSummaryInput: SaveSummaryInput): Promise<SaveSummaryOutput> {
    return this._libraryService.createSummary(saveSummaryInput);
  }

  @Mutation(() => Boolean)
  public async deleteAll(): Promise<boolean> {
    await this._libraryService.deleteAll();
    return true;
  }

  @Mutation(() => Boolean)
  public async deleteSummary(@Args('input') deleteSummaryInput: DeleteSummaryInput): Promise<boolean> {
    await this._libraryService.deleteSummary(deleteSummaryInput);
    return true;
  }
}
