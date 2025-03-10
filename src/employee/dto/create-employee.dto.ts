import { IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    readonly name?: string;

    

}
