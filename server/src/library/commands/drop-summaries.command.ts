import { Command, CommandRunner } from 'nest-commander';
import { LibraryService } from '../services/library.service';

@Command({
  name: 'summaries:drop',
  description: 'Deletes all summaries from the database'
})
export class DropSummariesCommand extends CommandRunner {
  constructor(private readonly _libraryService: LibraryService) {
    super();
  }

  public async run(inputs: string[], options: Record<string, any>): Promise<void> {
    console.log('Dropping summaries...');
    await this._libraryService.deleteAll();
    console.log('Done');
  }
}
