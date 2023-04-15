import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { SummaryDto } from './summary.dto';

@InputType()
export class CreateSummaryInput extends OmitType(SummaryDto, ['createdAt'], InputType) {}

@ObjectType()
export class CreateSummaryOutput extends SummaryDto {}
