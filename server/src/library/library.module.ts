import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedSummariesCommand } from './commands/seed-summaries.command';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';
import { SUMMARY, SummarySchema } from './models/summary.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SUMMARY, schema: SummarySchema }])],
  providers: [LibraryResolver, LibraryService, SeedSummariesCommand],
  exports: [SeedSummariesCommand]
})
export class LibraryModule {}
