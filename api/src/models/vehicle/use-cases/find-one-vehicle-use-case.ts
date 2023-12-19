import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class FindOneVehicleUseCase {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  async execute(id: number) {
    try {
      return await this.vehicleRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
  }
}
