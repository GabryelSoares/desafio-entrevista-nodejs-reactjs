import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ExitRegisterDto } from '../dto/exit-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { EntryRegisterNotFoundException } from 'src/helpers/exceptions/EntryRegisterNotFoundException';

@Injectable()
export class ExitRegisterUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
  ) {}

  async execute(updateParkingRegisterDto: ExitRegisterDto) {
    const existingEntry = await this.parkingRegisterRepository.findOneBy({
      vehicle: {
        plate: updateParkingRegisterDto.vehiclePlate,
      },
      establishment: {
        id: updateParkingRegisterDto.establishmentId,
      },
      exit: IsNull(),
    });

    if (!existingEntry) {
      throw new EntryRegisterNotFoundException(
        updateParkingRegisterDto.vehiclePlate,
      );
    }

    existingEntry.exit = new Date();
    return await this.parkingRegisterRepository.save(existingEntry);
  }
}
