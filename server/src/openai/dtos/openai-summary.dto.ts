import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OpenAISummary {
  @Field(() => String)
  public readonly id: string;

  @Field(() => String)
  public readonly content: string;

  @Field(() => [String])
  public readonly tags: string[];

  constructor(id: string, content: string, tags: string[]) {
    this.id = id;
    this.content = content;
    this.tags = tags;
  }
}
