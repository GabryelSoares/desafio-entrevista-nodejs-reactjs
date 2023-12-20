import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class FindEstablishmentByEmailUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}
  async execute(email: string) {
    return await this.establishmentRepository
      .createQueryBuilder('establishment')
      .select(['establishment.id'])
      .where('establishment.email = :email', { email })
      .getOne();
  }
}
