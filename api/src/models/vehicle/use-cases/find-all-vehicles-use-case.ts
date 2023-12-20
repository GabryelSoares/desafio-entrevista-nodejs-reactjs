import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class FindAllVehiclesUseCase {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  async execute(establishmentId: number) {
    return await this.vehicleRepository.find({
      order: { createdAt: 'DESC' },
      where: { establishment: { id: establishmentId } },
    });
  }
}
