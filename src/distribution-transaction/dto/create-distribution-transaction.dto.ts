import { IsNumber, IsString } from "class-validator";

export class CreateDistributionTransactionDto {

    @IsNumber()
    readonly quantity?: number;

    @IsString()
    readonly status?: string;

    
}
