import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DropSummariesCommand } from './commands/drop-summaries.command';
import { SeedSummariesCommand } from './commands/seed-summaries.command';
import { Summary, SummarySchema } from './models/summary';
import { LibraryResolver } from './resolvers/library.resolver';
import { LibraryService } from './services/library.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }])],
  providers: [LibraryResolver, LibraryService, SeedSummariesCommand, DropSummariesCommand],
  exports: [SeedSummariesCommand, DropSummariesCommand]
})
export class LibraryModule {}
