import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DropSummariesCommand } from './commands/drop-summaries.command';
import { SeedSummariesCommand } from './commands/seed-summaries.command';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';
import { SUMMARY, SummarySchema } from './models/summary.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SUMMARY, schema: SummarySchema }])],
  providers: [LibraryResolver, LibraryService, SeedSummariesCommand, DropSummariesCommand],
  exports: [SeedSummariesCommand, DropSummariesCommand]
})
export class LibraryModule {}
