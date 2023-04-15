import * as mongoose from 'mongoose';

export const SummarySchema = new mongoose.Schema(
  {
    summary: String,
    tags: [String],
    highlightedText: String
  },
  { timestamps: true }
);

export const SUMMARY_SCHEMA_NAME = 'Summary';
