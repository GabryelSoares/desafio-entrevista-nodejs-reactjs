import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './vehicle.controller';
import { CreateVehicleUseCase } from './use-cases/create-vehicle-use-case';
import { FindAllVehiclesUseCase } from './use-cases/find-all-vehicles-use-case';
import { FindOneVehicleUseCase } from './use-cases/find-one-vehicle-use-case';
import { RemoveVehicleUseCase } from './use-cases/remove-vehicle-use-case';
import { UpdateVehicleUseCase } from './use-cases/update-vehicle-use-case';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  exports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [
    CreateVehicleUseCase,
    FindAllVehiclesUseCase,
    FindOneVehicleUseCase,
    RemoveVehicleUseCase,
    UpdateVehicleUseCase,
  ],
})
export class VehicleModule {}
