import { faker } from '@faker-js/faker';
import { Command, CommandRunner, Option } from 'nest-commander';
import { SaveSummaryInput } from '../dtos/save-summary.dto';
import { LibraryService } from '../library.service';

@Command({
  name: 'summaries:seed',
  description: 'Seeds the database with a desired number of random summaries',
  argsDescription: {
    ['--count (-c)']: 'The number of summaries to seed'
  }
})
export class SeedSummariesCommand extends CommandRunner {
  constructor(private readonly _libraryService: LibraryService) {
    super();
  }

  public async run(inputs: string[], options: Record<string, any>): Promise<void> {
    if (options.count) {
      console.log('Clearing database...');
      await this._libraryService.deleteAll();
      console.log('Seeding database...');
      const summaries: SaveSummaryInput[] = Array.from({ length: options.count }, this.makeRandomSummary.bind(this));
      await this._libraryService.createSummaries(summaries);
      console.log('Done');
    }
  }

  @Option({
    flags: '-c, --count [number]'
  })
  public parseCount(count: string): number {
    return parseInt(count, 10);
  }

  private makeRandomSummary(): SaveSummaryInput {
    return {
      content: this.makeRandomContent(),
      tags: this.makeRandomTags(),
      highlightedText: this.makeRandomHighlightedText()
    };
  }

  private makeRandomContent(): string {
    return faker.lorem.text();
  }

  private makeRandomTags(): string[] {
    return faker.random.words().split(' ');
  }

  private makeRandomHighlightedText(): string {
    return faker.random.words();
  }
}
