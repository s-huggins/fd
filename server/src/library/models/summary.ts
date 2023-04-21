import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDocumentBase } from '../../common/interfaces/document-base.interface';

/**
 * Mongoose schema for Summary document.
 */
@Schema({
  timestamps: true,
  toJSON: { virtuals: true }
})
export class Summary extends Document implements IDocumentBase {
  @Prop()
  public content: string;

  @Prop()
  public tags: string[];

  @Prop()
  public highlightedText: string;

  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
