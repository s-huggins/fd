import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Summary } from '../models/summary';

@ObjectType()
@InputType({ isAbstract: true })
export class SummaryDto implements Pick<Summary, 'content' | 'tags' | 'highlightedText' | 'createdAt' | 'id'> {
  @Field(type => String)
  public readonly id: string;

  @Field(type => String)
  public readonly content: string;

  @Field(type => [String])
  public readonly tags: string[];

  @Field(type => String)
  public readonly highlightedText: string;

  @Field(type => String)
  public readonly createdAt: Date;
}
