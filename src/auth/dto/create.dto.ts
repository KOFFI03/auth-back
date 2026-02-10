import { Type } from 'class-transformer';
import { IsBtcAddress, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @MinLength(4)
  password!: string;

  @IsString()
 adresse!: string;

  @IsNumber()
  @Type(() => Number)
  numero!: number;
}
