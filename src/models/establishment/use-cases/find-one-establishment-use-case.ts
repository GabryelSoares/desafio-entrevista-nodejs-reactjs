import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class FindOneEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}
  async execute(id: number) {
    try {
      return await this.establishmentRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
  }
}
