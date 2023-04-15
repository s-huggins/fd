import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSummaryInput, CreateSummaryOutput } from './dtos/create-summary.dto';
import { SummaryDto } from './dtos/summary.dto';
import { LibraryService } from './library.service';
import { Summary } from './models/summary.interface';

@Resolver()
export class LibraryResolver {
  constructor(private readonly _libraryService: LibraryService) {}

  @Query(() => [SummaryDto])
  public getSummaries(): Promise<Summary[]> {
    return this._libraryService.getAllSummaries();
  }

  @Mutation(() => CreateSummaryOutput)
  public async createSummary(@Args('input') createSummaryInput: CreateSummaryInput): Promise<CreateSummaryOutput> {
    return this._libraryService.createSummary(createSummaryInput);
  }
}
