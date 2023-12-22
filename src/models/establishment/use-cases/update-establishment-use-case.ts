import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { EstablishmentNotFoundException } from 'src/helpers/exceptions/EstablishmentNotFoundException';

@Injectable()
export class UpdateEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}

  async execute(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    const establishment = await this.establishmentRepository.findOneBy({ id });

    if (!establishment) {
      throw new EstablishmentNotFoundException(id);
    }

    const result = this.establishmentRepository.merge(
      establishment,
      updateEstablishmentDto,
    );
    return await this.establishmentRepository.save(result);
  }
}
