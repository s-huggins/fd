import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveSummaryInput } from './dtos/save-summary.dto';
import { SummaryQueryInput } from './dtos/summary-query-input.dto';
import { SummaryQueryOutput } from './dtos/summary-query-output.dto';
import { Summary } from './models/summary.interface';
import { SUMMARY } from './models/summary.schema';
@Injectable()
export class LibraryService {
  constructor(@InjectModel(SUMMARY) private readonly _summaryModel: Model<Summary>) {}

  public async deleteAll(): Promise<void> {
    await this._summaryModel.deleteMany();
  }

  public async createSummary(summaryInput: SaveSummaryInput): Promise<Summary> {
    const summary = new this._summaryModel(summaryInput);
    return summary.save();
  }

  public async getSummaries(summaryQueryInput: SummaryQueryInput): Promise<SummaryQueryOutput> {
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
      .skip((summaryQueryInput.page - 1) * summaryQueryInput.itemsPerPage)
      .limit(summaryQueryInput.itemsPerPage);

    const summaries: Summary[] = await query.exec();
    const totalPageCount: number = await this.getTotalPagesCount(summaryQueryInput.itemsPerPage);

    return {
      data: summaries,
      pagination: {
        page: summaryQueryInput.page,
        itemsPerPage: summaryQueryInput.itemsPerPage,
        totalPages: totalPageCount
      }
    };
  }

  private async getTotalPagesCount(itemsPerPage: number): Promise<number> {
    const totalCount: number = await this.getTotalSummariesCount();
    return Math.ceil(totalCount / itemsPerPage);
  }

  private getTotalSummariesCount(): Promise<number> {
    return this._summaryModel.count();
  }
}
