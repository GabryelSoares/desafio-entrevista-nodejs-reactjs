import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryRegisterDto } from '../dto/entry-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
import { ParkingRegisterAlreadyExistsException } from 'src/helpers/exceptions/ParkingRegisterAlreadyExistsException';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';
import { EstablishmentNotFoundException } from 'src/helpers/exceptions/EstablishmentNotFoundException';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { NoAvailableParkingSpaceException } from 'src/helpers/exceptions/NoAvailableParkingSpaceException';
import { VehicleNotFoundException } from 'src/helpers/exceptions/VehicleNotFoundException';

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

  async execute(entryRegisterDto: EntryRegisterDto, establishmentId: number) {
    const existingVehicle = await this.vehicleRepository.findOneBy({
      plate: entryRegisterDto.vehiclePlate,
      establishment: {
        id: establishmentId,
      },
    });

    if (!existingVehicle) {
      throw new VehicleNotFoundException(entryRegisterDto.vehiclePlate);
    }

    const establishment = await this.establishmentRepository.findOneByOrFail({
      id: establishmentId,
    });

    if (!establishment) {
      throw new EstablishmentNotFoundException(establishmentId);
    }

    if (
      (entryRegisterDto.vehicleType === VehicleTypeEnum.CAR &&
        establishment.availableCarSlots <= 0) ||
      (entryRegisterDto.vehicleType === VehicleTypeEnum.MOTORCYCLE &&
        establishment.availableMotorcycleSlots <= 0)
    ) {
      throw new NoAvailableParkingSpaceException();
    }

    if (entryRegisterDto.vehicleType === VehicleTypeEnum.CAR) {
      establishment.availableCarSlots -= 1;
    }
    if (entryRegisterDto.vehicleType === VehicleTypeEnum.MOTORCYCLE) {
      establishment.availableMotorcycleSlots -= 1;
    }

    const existingParking = await this.parkingRegisterRepository.findOneBy({
      vehicle: {
        plate: entryRegisterDto.vehiclePlate,
      },
      establishment: {
        id: establishmentId,
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
        establishment,
        entry: new Date(),
      }),
    );
  }
}
