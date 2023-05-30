import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
