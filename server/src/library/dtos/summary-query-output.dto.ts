import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedOutput } from 'src/common/dtos/paginated-output.dto';
import { SummaryDto } from './summary.dto';

@ObjectType()
export class SummaryQueryOutput extends PaginatedOutput {
  @Field(() => [SummaryDto])
  public readonly data: SummaryDto[];
}
