import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class LibraryResolver {
  @Query(() => String)
  public test(): string {
    return 'hello world';
  }
}
