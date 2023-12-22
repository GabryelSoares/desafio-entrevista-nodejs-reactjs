import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';
import { FindEstablishmentByEmailUseCase } from 'src/models/establishment/use-cases/find-establishment-by-email-use-case';
import { Repository } from 'typeorm';
import { SignUpUseCase } from './sign-up-use-case';
import { CreateEstablishmentUseCase } from 'src/models/establishment/use-cases/create-establishment-use-case';
import mocks from 'src/helpers/mocks';
import { EmailAlreadyRegistered } from 'src/helpers/exceptions/EmailAlreadyRegistered';
import { CreateEstablishmentDto } from 'src/models/establishment/dto/create-establishment.dto';

const createEstablishmentDto: CreateEstablishmentDto = {
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  email: '1test@gmail.com',
  password: 'senha',
  address: 'avenida teste, 123',
  phone: '99 99999-9999',
  motorcycleSlots: 10,
  carSlots: 10,
};
const establishment = mocks.models.establishment.createEstablishment(
  createEstablishmentDto,
);
const mockedToken = 'mockedToken';

describe('SignUpUseCase', () => {
  let createEstablishmentUseCase: CreateEstablishmentUseCase;
  let signUpUseCase: SignUpUseCase;
  let findEstablishmentByEmailUseCase: FindEstablishmentByEmailUseCase;
  let establishmentRepository: Repository<Establishment>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindEstablishmentByEmailUseCase,
        SignUpUseCase,
        CreateEstablishmentUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            create: jest.fn().mockReturnValue(establishment),
            save: jest.fn().mockResolvedValue(establishment),
            findOneBy: jest.fn().mockResolvedValue(establishment),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockReturnValue(mockedToken),
          },
        },
      ],
    }).compile();

    createEstablishmentUseCase = module.get<CreateEstablishmentUseCase>(
      CreateEstablishmentUseCase,
    );
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    findEstablishmentByEmailUseCase =
      module.get<FindEstablishmentByEmailUseCase>(
        FindEstablishmentByEmailUseCase,
      );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(createEstablishmentUseCase).toBeDefined();
    expect(signUpUseCase).toBeDefined();
    expect(findEstablishmentByEmailUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('Signup', () => {
    it('Should throw an error if email is already registered', async () => {
      jest
        .spyOn(findEstablishmentByEmailUseCase, 'execute')
        .mockResolvedValue(establishment);
      await expect(signUpUseCase.execute(establishment)).rejects.toThrow(
        new EmailAlreadyRegistered(establishment.email).message,
      );
    });

    it('Should sign up and return establishment with token', async () => {
      jest
        .spyOn(signUpUseCase, 'execute')
        .mockResolvedValue({ establishment, accessToken: mockedToken });
      const result = await signUpUseCase.execute(createEstablishmentDto);
      expect(signUpUseCase.execute).toHaveBeenCalledWith(
        createEstablishmentDto,
      );
      expect(result).toEqual({
        establishment,
        accessToken: mockedToken,
      });
      expect(signUpUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
