import { IsNumber, IsString } from "class-validator";
export class CreateProductDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly categoryId: number ;

    @IsNumber()
    readonly price: number;
   
    @IsString()
    readonly description?: string;
}
