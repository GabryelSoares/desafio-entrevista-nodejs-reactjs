import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUseCase } from './sign-in-use-case';
import mocks from 'src/helpers/mocks';
import { SignInDto } from '../dto/sign-in.dto';
import { FindEstablishmentByEmailUseCase } from 'src/models/establishment/use-cases/find-establishment-by-email-use-case';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

const signInDto: SignInDto = {
  email: '1test@gmail.com',
  password: 'senha',
};

const establishment = mocks.models.establishment.createEstablishment({
  ...signInDto,
});

const mockedToken = 'mockedToken';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let findEstablishmentByEmailUseCase: FindEstablishmentByEmailUseCase;
  let establishmentRepository: Repository<Establishment>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindEstablishmentByEmailUseCase,
        SignInUseCase,
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

    signInUseCase = module.get<SignInUseCase>(SignInUseCase);
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
    expect(findEstablishmentByEmailUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('execute', () => {
    it('should throw an exception if establishment not found', async () => {
      jest
        .spyOn(establishmentRepository, 'findOneBy')
        .mockRejectedValueOnce(new UnauthorizedException());

      expect(signInUseCase.execute(signInDto)).rejects.toThrow(
        new UnauthorizedException().message,
      );
    });
    it('should throw an exception if password is invalid', async () => {
      jest.spyOn(signInUseCase, 'verifyPassword').mockResolvedValueOnce(false);

      await expect(signInUseCase.execute(signInDto)).rejects.toThrow(
        new UnauthorizedException().message,
      );
    });

    it('should sign in successfully', async () => {
      const findOneBySpy = jest
        .spyOn(establishmentRepository, 'findOneBy')
        .mockResolvedValueOnce(establishment);
      jest.spyOn(signInUseCase, 'verifyPassword').mockResolvedValueOnce(true);

      const result = await signInUseCase.execute(signInDto);
      const establishmentWithoutPassord = { ...establishment };
      delete establishmentWithoutPassord.password;

      expect(result).toEqual({
        establishment: establishmentWithoutPassord,
        accessToken: mockedToken,
      });

      expect(findOneBySpy).toHaveBeenCalledWith({ email: signInDto.email });

      expect(signInUseCase.verifyPassword).toHaveBeenCalledTimes(1);

      expect(signInUseCase.verifyPassword).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(signInUseCase, 'verifyPassword').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'signAsync').mockImplementationOnce(() => {
        throw new Error('Error');
      });

      expect(signInUseCase.execute(signInDto)).rejects.toThrow('Error');
    });
  });
});
