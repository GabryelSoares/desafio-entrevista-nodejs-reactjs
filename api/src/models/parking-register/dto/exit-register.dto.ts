import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class ExitRegisterDto {
  @IsString()
  @Matches(/^[A-Z]{3}-?[0-9][0-9A-Z][0-9]{2}$/, {
    message: 'Invalid Mercosul vehicle plate format',
  })
  @Transform(({ value }) => value.replace('-', ''))
  @IsNotEmpty()
  @ApiProperty()
  vehiclePlate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  establishmentId: number;
}
