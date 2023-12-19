import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ExitRegisterDto {
  @IsString()
  @Length(7, 7)
  @IsNotEmpty()
  @ApiProperty()
  vehiclePlate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  establishmentId: number;
}
