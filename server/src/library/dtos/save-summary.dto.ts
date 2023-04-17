import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { SummaryDto } from './summary.dto';

@InputType()
export class SaveSummaryInput extends OmitType(SummaryDto, ['createdAt', 'id'], InputType) {}

@ObjectType()
export class SaveSummaryOutput extends SummaryDto {}
