import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleTransactionDto } from './create-sale-transaction.dto';

export class UpdateSaleTransactionDto extends PartialType(CreateSaleTransactionDto) {}
