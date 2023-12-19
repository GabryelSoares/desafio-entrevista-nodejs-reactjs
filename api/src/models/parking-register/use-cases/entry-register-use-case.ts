import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryRegisterDto } from '../dto/entry-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
import { ParkingRegisterAlreadyExistsException } from 'src/helpers/exceptions/ParkingRegisterAlreadyExistsException';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';
import { EstablishmentNotFoundException } from 'src/helpers/exceptions/EstablishmentNotFoundException';

@Injectable()
export class CreateParkingRegisterUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}

  async execute(entryRegisterDto: EntryRegisterDto) {
    const existingVehicle = await this.vehicleRepository.findOneByOrFail({
      plate: entryRegisterDto.vehiclePlate,
    });

    if (!existingVehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    const existingEstablishment =
      await this.establishmentRepository.findOneByOrFail({
        id: entryRegisterDto.establishmentId,
      });

    if (!existingEstablishment) {
      throw new EstablishmentNotFoundException(
        entryRegisterDto.establishmentId,
      );
    }

    const existingParking = await this.parkingRegisterRepository.findOneBy({
      vehicle: {
        plate: entryRegisterDto.vehiclePlate,
      },
      establishment: {
        id: entryRegisterDto.establishmentId,
      },
      exit: null,
    });

    if (existingParking) {
      throw new ParkingRegisterAlreadyExistsException(
        entryRegisterDto.vehiclePlate,
      );
    }

    return await this.parkingRegisterRepository.save(
      this.parkingRegisterRepository.create({
        vehicle: existingVehicle,
        establishment: existingEstablishment,
        entry: new Date(),
      }),
    );
  }
}
