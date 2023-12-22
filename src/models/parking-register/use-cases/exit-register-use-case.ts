import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ExitRegisterDto } from '../dto/exit-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { EntryRegisterNotFoundException } from 'src/helpers/exceptions/EntryRegisterNotFoundException';
import { FindOneEstablishmentUseCase } from 'src/models/establishment/use-cases/find-one-establishment-use-case';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

@Injectable()
export class ExitRegisterUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
    private readonly findOneEstablishmentUseCase: FindOneEstablishmentUseCase,
  ) {}

  async execute(exitRegisterDto: ExitRegisterDto, establishmentId: number) {
    const existingEntry = await this.parkingRegisterRepository.findOneBy({
      vehicle: {
        plate: exitRegisterDto.vehiclePlate,
      },
      establishment: {
        id: establishmentId,
      },
      exit: IsNull(),
    });

    if (!existingEntry) {
      throw new EntryRegisterNotFoundException(exitRegisterDto.vehiclePlate);
    }

    const establishment =
      await this.findOneEstablishmentUseCase.execute(establishmentId);

    if (existingEntry.vehicle.type === VehicleTypeEnum.CAR) {
      establishment.availableCarSlots += 1;
    }
    if (existingEntry.vehicle.type === VehicleTypeEnum.MOTORCYCLE) {
      establishment.availableMotorcycleSlots += 1;
    }

    existingEntry.exit = new Date();
    return await this.parkingRegisterRepository.save(existingEntry);
  }
}
