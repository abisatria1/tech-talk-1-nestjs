import { Trim } from 'class-sanitizer';
import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;
}
