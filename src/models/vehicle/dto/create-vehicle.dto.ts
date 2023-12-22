import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  color: string;

  @IsString()
  @Matches(/^[A-Z]{3}-?[0-9][0-9A-Z][0-9]{2}$/, {
    message: 'Invalid Mercosul vehicle plate format',
  })
  @Transform(({ value }) => value.replace('-', ''))
  @IsNotEmpty()
  @ApiProperty()
  plate: string;

  @IsEnum(VehicleTypeEnum)
  @ApiProperty({ enum: VehicleTypeEnum })
  type: VehicleTypeEnum;
}
