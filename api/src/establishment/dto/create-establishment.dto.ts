import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(14, 14)
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short' })
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  motorcycleSlots: number;

  @IsNumber()
  @IsNotEmpty()
  carSlots: number;
}
