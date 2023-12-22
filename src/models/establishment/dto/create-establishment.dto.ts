import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @Length(14, 14)
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short' })
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNumber()
  @Min(10, { message: 'motorcycleSlots must be at least 10' })
  @ApiProperty()
  motorcycleSlots: number;

  @IsNumber()
  @Min(10, { message: 'carSlots must be at least 10' })
  @ApiProperty()
  carSlots: number;
}
