import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
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
  @Length(7, 7)
  @IsNotEmpty()
  @ApiProperty()
  plate: string;

  @IsEnum(VehicleTypeEnum)
  @ApiProperty({ enum: VehicleTypeEnum })
  type: VehicleTypeEnum;
}
