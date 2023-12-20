import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { CreateEstablishmentDto } from 'src/models/establishment/dto/create-establishment.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in-use-case';
import { SignUpUseCase } from './use-cases/sign-up-use-case';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Post('/sign-up/')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 201,
    description: 'Sign up successfully',
    type: CreateEstablishmentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.signUpUseCase.execute(createEstablishmentDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 201,
    description: 'Sign in successfully',
    type: SignInDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params',
    type: BadRequestSwagger,
  })
  login(@Body() body: SignInDto) {
    return this.signInUseCase.execute(body);
  }
}
