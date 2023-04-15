import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibraryResolver } from './library.resolver';
import { SUMMARY_SCHEMA_NAME, SummarySchema } from './models/summary.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SUMMARY_SCHEMA_NAME, schema: SummarySchema }])],
  providers: [LibraryResolver]
})
export class LibraryModule {}
