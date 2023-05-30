import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class AuthSignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}
