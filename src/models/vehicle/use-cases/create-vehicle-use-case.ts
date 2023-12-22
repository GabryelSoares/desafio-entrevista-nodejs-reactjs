import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleAlreadyExistsException } from 'src/helpers/exceptions/VehicleAlreadyExistsException';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async execute(createVehicleDto: CreateVehicleDto, establishmentId) {
    const existingVehicle = await this.vehicleRepository.findOneBy({
      plate: createVehicleDto.plate,
      establishment: {
        id: establishmentId,
      },
    });

    if (existingVehicle) {
      throw new VehicleAlreadyExistsException(createVehicleDto.plate);
    }

    const newVehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      establishment: { id: establishmentId },
    });

    return await this.vehicleRepository.save(newVehicle);
  }
}
