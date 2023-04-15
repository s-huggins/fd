import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSummaryInput } from './dtos/create-summary.dto';
import { Summary } from './models/summary.interface';
import { SUMMARY } from './models/summary.schema';
@Injectable()
export class LibraryService {
  constructor(@InjectModel(SUMMARY) private readonly _summaryModel: Model<Summary>) {}

  public async createSummary(summaryInput: CreateSummaryInput): Promise<Summary> {
    const summary = new this._summaryModel(summaryInput);
    return summary.save();
  }

  public async getAllSummaries(): Promise<Summary[]> {
    return this._summaryModel
      .find()
      .sort({
        createdAt: -1
      })
      .exec();
  }
}
