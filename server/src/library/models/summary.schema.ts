import * as mongoose from 'mongoose';

export const SummarySchema = new mongoose.Schema(
  {
    content: String,
    tags: [String],
    highlightedText: String
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const SUMMARY = 'Summary';
