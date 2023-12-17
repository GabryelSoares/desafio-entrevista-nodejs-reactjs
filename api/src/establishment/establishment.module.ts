import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment])],
  controllers: [EstablishmentController],
  providers: [
    CreateEstablishmentUseCase,
    EstablishmentService,
    UpdateEstablishmentUseCase,
    FindAllEstablishmentsUseCase,
    FindOneEstablishmentUseCase,
  ],
})
export class EstablishmentModule {}
