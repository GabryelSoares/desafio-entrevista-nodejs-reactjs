import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { RemoveEstablishmentUseCase } from './use-cases/remove-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';

@Controller('establishment')
export class EstablishmentController {
  @Inject(CreateEstablishmentUseCase)
  private readonly createEstablishmentUseCase: CreateEstablishmentUseCase;
  @Inject(FindAllEstablishmentsUseCase)
  private readonly findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;
  @Inject(FindOneEstablishmentUseCase)
  private readonly findOneEstablishmentsUseCase: FindOneEstablishmentUseCase;
  @Inject(RemoveEstablishmentUseCase)
  private readonly removeEstablishmentUseCase: RemoveEstablishmentUseCase;
  @Inject(UpdateEstablishmentUseCase)
  private readonly updateEstablishmentUseCase: UpdateEstablishmentUseCase;

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.createEstablishmentUseCase.execute(createEstablishmentDto);
  }

  @Get()
  findAll() {
    return this.findAllEstablishmentsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneEstablishmentsUseCase.execute(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ) {
    return this.updateEstablishmentUseCase.execute(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeEstablishmentUseCase.execute(+id);
  }
}
