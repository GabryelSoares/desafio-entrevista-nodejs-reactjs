import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';

@Injectable()
export class RemoveEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    private readonly findOneEstablishmentUseCase: FindOneEstablishmentUseCase,
  ) {}
  async execute(id: number) {
    await this.findOneEstablishmentUseCase.execute(id);
    return await this.establishmentRepository.delete(id);
  }
}
