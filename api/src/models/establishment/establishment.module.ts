import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentController } from './establishment.controller';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { RemoveEstablishmentUseCase } from './use-cases/remove-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';
import { Establishment } from './entities/establishment.entity';
import { FindEstablishmentByEmailUseCase } from './use-cases/find-establishment-by-email-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment])],
  controllers: [EstablishmentController],
  exports: [
    TypeOrmModule.forFeature([Establishment]),
    CreateEstablishmentUseCase,
    FindEstablishmentByEmailUseCase,
  ],
  providers: [
    CreateEstablishmentUseCase,
    FindAllEstablishmentsUseCase,
    FindOneEstablishmentUseCase,
    FindEstablishmentByEmailUseCase,
    RemoveEstablishmentUseCase,
    UpdateEstablishmentUseCase,
  ],
})
export class EstablishmentModule {}
