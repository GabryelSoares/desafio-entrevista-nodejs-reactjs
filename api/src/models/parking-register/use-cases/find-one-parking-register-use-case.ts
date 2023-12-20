import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';
import { ParkingRegisterNotFoundException } from 'src/helpers/exceptions/ParkingRegisterNotFoundException';

@Injectable()
export class FindOneParkingRegisterUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
  ) {}
  async execute(id: number, establishmentId: number) {
    try {
      return await this.parkingRegisterRepository.findOneByOrFail({
        id,
        establishment: { id: establishmentId },
      });
    } catch {
      throw new ParkingRegisterNotFoundException(id);
    }
  }
}
