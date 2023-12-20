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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found-request.swagger';
import { EntryRegisterDto } from './dto/entry-register.dto';
import { ExitRegisterDto } from './dto/exit-register.dto';
import { CreateParkingRegisterSwagger } from './swagger/create-parking-register.swagger';
import { FindAllParkingRegisterSwagger } from './swagger/find-all-parking-registers.swagger';
import { FindOneParkingRegisterSwagger } from './swagger/find-one-parking-register.swagger';
import { UpdateParkingRegisterSwagger } from './swagger/update-parking-register.swagger';
import { CreateParkingRegisterUseCase } from './use-cases/entry-register-use-case';
import { FindAllParkingRegistersUseCase } from './use-cases/find-all-parking-registers-use-case';
import { FindOneParkingRegisterUseCase } from './use-cases/find-one-parking-register-use-case';
import { RemoveParkingRegisterUseCase } from './use-cases/remove-parking-register-use-case';
import { ExitRegisterUseCase } from './use-cases/exit-register-use-case';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('parkingRegisters')
@ApiTags('parkingRegisters')
export class ParkingRegisterController {
  @Inject(CreateParkingRegisterUseCase)
  private readonly createParkingRegisterUseCase: CreateParkingRegisterUseCase;
  @Inject(FindAllParkingRegistersUseCase)
  private readonly findAllParkingRegistersUseCase: FindAllParkingRegistersUseCase;
  @Inject(FindOneParkingRegisterUseCase)
  private readonly findOneParkingRegistersUseCase: FindOneParkingRegisterUseCase;
  @Inject(RemoveParkingRegisterUseCase)
  private readonly removeParkingRegisterUseCase: RemoveParkingRegisterUseCase;
  @Inject(ExitRegisterUseCase)
  private readonly updateParkingRegisterUseCase: ExitRegisterUseCase;

  @Post()
  @ApiOperation({ summary: 'Create entry register' })
  @ApiResponse({
    status: 201,
    description: 'Entry register successfully created',
    type: CreateParkingRegisterSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  create(@Body() createParkingRegisterDto: EntryRegisterDto) {
    return this.createParkingRegisterUseCase.execute(createParkingRegisterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all parkingRegisters' })
  @ApiResponse({
    status: 200,
    description: 'List of parkingRegisters returned successfully',
    type: FindAllParkingRegisterSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'ParkingRegister not found',
    type: NotFoundSwagger,
  })
  findAll() {
    return this.findAllParkingRegistersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one parkingRegister' })
  @ApiResponse({
    status: 200,
    description: 'ParkingRegister returned successfully',
    type: FindOneParkingRegisterSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'ParkingRegister not found',
    type: NotFoundSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.findOneParkingRegistersUseCase.execute(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Exit register' })
  @ApiResponse({
    status: 201,
    description: 'Exit register successfully saved',
    type: UpdateParkingRegisterSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'ParkingRegister not found',
    type: NotFoundSwagger,
  })
  update(@Body() exitParkingRegisterDto: ExitRegisterDto) {
    return this.updateParkingRegisterUseCase.execute(exitParkingRegisterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove parkingRegister' })
  @ApiResponse({
    status: 204,
    description: 'ParkingRegister successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'ParkingRegister not found',
    type: NotFoundSwagger,
  })
  remove(@Param('id') id: string) {
    return this.removeParkingRegisterUseCase.execute(+id);
  }
}
