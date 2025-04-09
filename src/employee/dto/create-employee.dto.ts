import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    readonly name?: string;

    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly password?: string; 

   @IsPhoneNumber()
    readonly phone?: string;

    

}
