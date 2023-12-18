import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';

@Injectable()
export class UpdateEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    private readonly findOneEstablishmentUseCase: FindOneEstablishmentUseCase,
  ) {}

  async execute(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    const establishment = await this.findOneEstablishmentUseCase.execute(id);

    const result = this.establishmentRepository.merge(
      establishment,
      updateEstablishmentDto,
    );
    return await this.establishmentRepository.save(result);
  }
}
