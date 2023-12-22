import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';

@Injectable()
export class RemoveVehicleUseCase {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly findOneVehicleUseCase: FindOneVehicleUseCase,
  ) {}
  async execute(id: number, establishmentId: number) {
    await this.findOneVehicleUseCase.execute(id, establishmentId);
    return await this.vehicleRepository.delete(id);
  }
}
