import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSummaryInput } from './dtos/create-summary.dto';
import { SUMMARY_PAGE_SIZE, SummaryQueryInput } from './dtos/summary-query.dto';
import { Summary } from './models/summary.interface';
import { SUMMARY } from './models/summary.schema';
@Injectable()
export class LibraryService {
  constructor(@InjectModel(SUMMARY) private readonly _summaryModel: Model<Summary>) {}

  public async createSummary(summaryInput: CreateSummaryInput): Promise<Summary> {
    const summary = new this._summaryModel(summaryInput);
    return summary.save();
  }

  public async getAllSummaries(summaryQueryInput: SummaryQueryInput): Promise<Summary[]> {
    let query = this._summaryModel.find();

    if (summaryQueryInput.tagFilters.length) {
      query = query.where({
        tags: { $all: summaryQueryInput.tagFilters }
      });
    }

    query = query
      .sort({
        createdAt: summaryQueryInput.createdAtSortOrder
      })
      .skip((summaryQueryInput.page - 1) * SUMMARY_PAGE_SIZE)
      .limit(SUMMARY_PAGE_SIZE);

    return query.exec();
  }
}
