import { Document } from 'mongoose';
import { IDocumentBase } from 'src/common/interfaces/document-base.interface';

export interface Summary extends Document, IDocumentBase {
  readonly id: string;
  readonly content: string;
  readonly tags: string[];
  readonly highlightedText: string;
}
