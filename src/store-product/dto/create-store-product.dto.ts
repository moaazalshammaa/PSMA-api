import { IsNumber } from "class-validator";

export class CreateStoreProductDto {
    @IsNumber()
    readonly quantity?: number;

    
}
