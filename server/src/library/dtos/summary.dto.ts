import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Summary } from '../models/summary.interface';

@ObjectType()
@InputType({ isAbstract: true })
export class SummaryDto implements Pick<Summary, 'detail' | 'tags' | 'highlightedText' | 'createdAt'> {
  @Field(type => String)
  public readonly detail: string;

  @Field(type => [String])
  public readonly tags: string[];

  @Field(type => String)
  public readonly highlightedText: string;

  @Field(type => Date)
  public readonly createdAt: Date;
}
