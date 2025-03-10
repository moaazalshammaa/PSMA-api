import { IsString } from "class-validator";

export class CreateStoreDto {

    @IsString()
    readonly name?: string;

    @IsString()
    readonly address?: string;

    @IsString()
    readonly phone?: string;
}

