import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { EstablishmentAlreadyExistsException } from 'src/helpers/exceptions/EstablishmentAlreadyExistsException';

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}
  async execute(createEstablishmentDto: CreateEstablishmentDto) {
    const existingEstablishment = await this.establishmentRepository.findOneBy({
      cnpj: createEstablishmentDto.cnpj,
    });

    if (existingEstablishment) {
      throw new EstablishmentAlreadyExistsException(
        createEstablishmentDto.cnpj,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.establishmentRepository.save(
      this.establishmentRepository.create(createEstablishmentDto),
    );
    return result;
  }
}
