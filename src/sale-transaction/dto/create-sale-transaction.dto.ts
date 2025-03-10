import { IsDate, IsNumber } from "class-validator";

export class CreateSaleTransactionDto {

    @IsNumber()
    readonly quantity?: number;

    @IsNumber()
    readonly totalPrice?: number;

    @IsDate()
    readonly date?: Date;

}
