import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found-request.swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleSwagger } from './swagger/create-vehicle.swagger';
import { FindAllVehicleSwagger } from './swagger/find-all-vehicles.swagger';
import { FindOneVehicleSwagger } from './swagger/find-one-vehicle.swagger';
import { UpdateVehicleSwagger } from './swagger/update-vehicle.swagger';
import { CreateVehicleUseCase } from './use-cases/create-vehicle-use-case';
import { FindAllVehiclesUseCase } from './use-cases/find-all-vehicles-use-case';
import { FindOneVehicleUseCase } from './use-cases/find-one-vehicle-use-case';
import { RemoveVehicleUseCase } from './use-cases/remove-vehicle-use-case';
import { UpdateVehicleUseCase } from './use-cases/update-vehicle-use-case';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('vehicles')
@ApiTags('vehicles')
export class VehicleController {
  @Inject(CreateVehicleUseCase)
  private readonly createVehicleUseCase: CreateVehicleUseCase;
  @Inject(FindAllVehiclesUseCase)
  private readonly findAllVehiclesUseCase: FindAllVehiclesUseCase;
  @Inject(FindOneVehicleUseCase)
  private readonly findOneVehiclesUseCase: FindOneVehicleUseCase;
  @Inject(RemoveVehicleUseCase)
  private readonly removeVehicleUseCase: RemoveVehicleUseCase;
  @Inject(UpdateVehicleUseCase)
  private readonly updateVehicleUseCase: UpdateVehicleUseCase;

  @Post()
  @ApiOperation({ summary: 'Create vehicle' })
  @ApiResponse({
    status: 201,
    description: 'New vehicle successfully created',
    type: CreateVehicleSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.createVehicleUseCase.execute(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all vehicles' })
  @ApiResponse({
    status: 200,
    description: 'List of vehicles returned successfully',
    type: FindAllVehicleSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
    type: NotFoundSwagger,
  })
  findAll() {
    return this.findAllVehiclesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one vehicle' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle returned successfully',
    type: FindOneVehicleSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
    type: NotFoundSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.findOneVehiclesUseCase.execute(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vehicle' })
  @ApiResponse({
    status: 201,
    description: 'Vehicle successfully updated',
    type: UpdateVehicleSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
    type: NotFoundSwagger,
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.updateVehicleUseCase.execute(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove vehicle' })
  @ApiResponse({
    status: 204,
    description: 'Vehicle successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
    type: NotFoundSwagger,
  })
  remove(@Param('id') id: string) {
    return this.removeVehicleUseCase.execute(+id);
  }
}
