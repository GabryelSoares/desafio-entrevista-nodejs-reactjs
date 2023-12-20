import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found-request.swagger';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { FindAllEstablishmentSwagger } from './swagger/find-all-establishment.swagger';
import { FindOneEstablishmentSwagger } from './swagger/find-one-establishment.swagger';
import { UpdateEstablishmentSwagger } from './swagger/update-establishment.swagger';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { RemoveEstablishmentUseCase } from './use-cases/remove-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('establishments')
@ApiTags('establishments')
export class EstablishmentController {
  @Inject(FindAllEstablishmentsUseCase)
  private readonly findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;
  @Inject(FindOneEstablishmentUseCase)
  private readonly findOneEstablishmentsUseCase: FindOneEstablishmentUseCase;
  @Inject(RemoveEstablishmentUseCase)
  private readonly removeEstablishmentUseCase: RemoveEstablishmentUseCase;
  @Inject(UpdateEstablishmentUseCase)
  private readonly updateEstablishmentUseCase: UpdateEstablishmentUseCase;

  @Get()
  @ApiOperation({ summary: 'Find all establishments' })
  @ApiResponse({
    status: 200,
    description: 'List of establishments returned successfully',
    type: FindAllEstablishmentSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Establishment not found',
    type: NotFoundSwagger,
  })
  findAll() {
    return this.findAllEstablishmentsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one establishment' })
  @ApiResponse({
    status: 200,
    description: 'Establishment returned successfully',
    type: FindOneEstablishmentSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Establishment not found',
    type: NotFoundSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.findOneEstablishmentsUseCase.execute(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update establishment' })
  @ApiResponse({
    status: 201,
    description: 'Establishment successfully updated',
    type: UpdateEstablishmentSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Establishment not found',
    type: NotFoundSwagger,
  })
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ) {
    return this.updateEstablishmentUseCase.execute(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove establishment' })
  @ApiResponse({
    status: 204,
    description: 'Establishment successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Establishment not found',
    type: NotFoundSwagger,
  })
  remove(@Param('id') id: string) {
    return this.removeEstablishmentUseCase.execute(+id);
  }
}
