import { PartialType } from '@nestjs/mapped-types';
import { CreateDistributionTransactionDto } from './create-distribution-transaction.dto';

export class UpdateDistributionTransactionDto extends PartialType(CreateDistributionTransactionDto) {}
