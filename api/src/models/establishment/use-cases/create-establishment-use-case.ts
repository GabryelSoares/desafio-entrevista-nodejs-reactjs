import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}
  async execute(createEstablishmentDto: CreateEstablishmentDto) {
    return await this.establishmentRepository.save(
      this.establishmentRepository.create(createEstablishmentDto),
    );
  }
}
