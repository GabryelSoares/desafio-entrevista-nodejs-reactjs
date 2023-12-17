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
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';

@Controller('establishment')
export class EstablishmentController {
  @Inject(CreateEstablishmentUseCase)
  private readonly createEstablishmentUseCase: CreateEstablishmentUseCase;
  @Inject(FindAllEstablishmentsUseCase)
  private readonly findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;
  @Inject(UpdateEstablishmentUseCase)
  private readonly updateEstablishmentUseCase: UpdateEstablishmentUseCase;

  constructor(private readonly establishmentService: EstablishmentService) {}

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
    return this.establishmentService.findOne(+id);
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
    return this.establishmentService.remove(+id);
  }
}
