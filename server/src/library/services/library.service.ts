import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { DeleteSummaryInput } from '../dtos/delete-summary-input.dto';
import { SaveSummaryInput } from '../dtos/save-summary.dto';
import { SummaryQueryInput } from '../dtos/summary-query-input.dto';
import { SummaryQueryOutput } from '../dtos/summary-query-output.dto';
import { Summary } from '../models/summary';

@Injectable()
export class LibraryService {
  constructor(@InjectModel(Summary.name) private readonly _summaryModel: Model<Summary>) {}

  public async createSummary(summaryInput: SaveSummaryInput): Promise<Summary> {
    const summary = new this._summaryModel(summaryInput);
    return summary.save();
  }

  public async createSummaries(summaryInputs: SaveSummaryInput[]): Promise<Summary[]> {
    const documents: Summary[] = summaryInputs.map((summary: SaveSummaryInput) => new this._summaryModel(summary));
    return this._summaryModel.insertMany(documents);
  }

  /**
   * Gets a page of summaries ordered & filtered according to query input.
   * @param summaryQueryInput
   * @returns
   */
  public async getSummaries(summaryQueryInput: SummaryQueryInput): Promise<SummaryQueryOutput> {
    const sanitizedInput: SummaryQueryInput = this.sanitizeQuery(summaryQueryInput);

    let query = this._summaryModel.find();

    // filter for summaries tagged with all the tags in the query, case-insensitively
    const caseInsensitiveFilter: RegExp[] = summaryQueryInput.tagFilters.map(
      (tagFilter: string) => new RegExp(`^${tagFilter}$`, 'i')
    );
    if (sanitizedInput.tagFilters.length) {
      query = query.where({
        tags: { $all: caseInsensitiveFilter }
      });
    }

    // count the total documents found meeting the filter for pagination purposes
    const countQuery = this._summaryModel.find().merge(query).count();

    // sort and paginate according to input
    query = query
      .sort({
        createdAt: sanitizedInput.createdAtSortOrder
      })
      .skip((sanitizedInput.page - 1) * sanitizedInput.itemsPerPage)
      .limit(sanitizedInput.itemsPerPage);

    const summaries: Summary[] = await query.exec();
    const totalSummariesCount: number = await countQuery.exec();
    const totalPageCount: number = Math.ceil(totalSummariesCount / sanitizedInput.itemsPerPage);

    return {
      data: summaries,
      pagination: {
        page: sanitizedInput.page,
        itemsPerPage: sanitizedInput.itemsPerPage,
        totalPages: totalPageCount
      }
    };
  }

  public async deleteAll(): Promise<void> {
    await this._summaryModel.deleteMany();
  }

  public async deleteSummary(deleteSummaryInput: DeleteSummaryInput): Promise<boolean> {
    await this._summaryModel.deleteOne({ _id: new Types.ObjectId(deleteSummaryInput.id) });
    return true;
  }

  /**
   * Sanitize and populate with defaults any missing query fields.
   * @param summaryQuery
   * @returns
   */
  private sanitizeQuery(summaryQuery: SummaryQueryInput): SummaryQueryInput {
    const sanitized: SummaryQueryInput = { ...summaryQuery };
    sanitized.createdAtSortOrder ??= SortOrderEnum.NewestFirst;
    sanitized.tagFilters ??= [];
    sanitized.page ??= 1;
    sanitized.itemsPerPage ??= 10;
    if (sanitized.itemsPerPage === 0) {
      sanitized.itemsPerPage = 10;
    }
    return sanitized;
  }
}
