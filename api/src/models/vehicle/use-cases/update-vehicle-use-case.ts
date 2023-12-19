import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly findOneVehicleUseCase: FindOneVehicleUseCase,
  ) {}

  async execute(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOneVehicleUseCase.execute(id);

    const result = this.vehicleRepository.merge(vehicle, updateVehicleDto);
    return await this.vehicleRepository.save(result);
  }
}
