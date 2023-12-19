import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';
import { FindOneParkingRegisterUseCase } from './find-one-parking-register-use-case';

@Injectable()
export class RemoveParkingRegisterUseCase {
  constructor(
    @InjectRepository(ParkingRegister)
    private readonly parkingRegisterRepository: Repository<ParkingRegister>,
    private readonly findOneParkingRegisterUseCase: FindOneParkingRegisterUseCase,
  ) {}
  async execute(id: number) {
    await this.findOneParkingRegisterUseCase.execute(id);
    return await this.parkingRegisterRepository.delete(id);
  }
}
