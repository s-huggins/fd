import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OpenAISummary {
  @Field(() => String)
  public readonly content: string;

  @Field(() => [String])
  public readonly tags: string[];

  @Field(() => Date)
  public readonly createdAt: Date;

  constructor(content: string, tags: string[], createdAt: Date) {
    this.content = content;
    this.tags = tags;
    this.createdAt = createdAt;
  }
}
