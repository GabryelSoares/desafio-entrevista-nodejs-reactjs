import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';

@Injectable()
export class FindAllParkingRegistersUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
  ) {}
  async execute(establishmentId: number) {
    return await this.parkingRegisterRepository.find({
      order: { id: 'DESC' },
      relations: ['vehicle', 'establishment'],
      where: { establishment: { id: establishmentId } },
    });
  }
}
