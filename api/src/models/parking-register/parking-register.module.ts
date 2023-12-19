import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRegisterController } from './parking-register.controller';
import { CreateParkingRegisterUseCase } from './use-cases/entry-register-use-case';
import { FindAllParkingRegistersUseCase } from './use-cases/find-all-parking-registers-use-case';
import { FindOneParkingRegisterUseCase } from './use-cases/find-one-parking-register-use-case';
import { RemoveParkingRegisterUseCase } from './use-cases/remove-parking-register-use-case';
import { ExitRegisterUseCase } from './use-cases/exit-register-use-case';
import { ParkingRegister } from './entities/parking-register.entity';
import { VehicleModule } from '../vehicle/vehicle.module';
import { EstablishmentModule } from '../establishment/establishment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingRegister]),
    VehicleModule,
    EstablishmentModule,
  ],
  controllers: [ParkingRegisterController],
  providers: [
    CreateParkingRegisterUseCase,
    FindAllParkingRegistersUseCase,
    FindOneParkingRegisterUseCase,
    RemoveParkingRegisterUseCase,
    ExitRegisterUseCase,
  ],
})
export class ParkingRegisterModule {}
