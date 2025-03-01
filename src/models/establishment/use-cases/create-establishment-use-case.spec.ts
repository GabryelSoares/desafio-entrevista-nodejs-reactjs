import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { CreateEstablishmentUseCase } from './create-establishment-use-case';
import { EstablishmentAlreadyExistsException } from 'src/helpers/exceptions/EstablishmentAlreadyExistsException';
import mocks from 'src/helpers/mocks';

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

const establishment = mocks.models.establishment.createEstablishment({
  ...createEstablishmentDto,
  availableCarSlots: createEstablishmentDto.carSlots,
  availableMotorcycleSlots: createEstablishmentDto.motorcycleSlots,
});

describe('CreateEstablishmentUseCase', () => {
  let createEstablishmentUseCase: CreateEstablishmentUseCase;
  let establishmentRepository: Repository<Establishment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEstablishmentUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            create: jest.fn().mockResolvedValue(establishment),
            save: jest.fn().mockResolvedValue(establishment),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    createEstablishmentUseCase = module.get<CreateEstablishmentUseCase>(
      CreateEstablishmentUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
  });

  it('should be defined', () => {
    expect(createEstablishmentUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw an exception if establishment with the same cnpj already exists', async () => {
      jest
        .spyOn(establishmentRepository, 'findOneBy')
        .mockRejectedValueOnce(
          new EstablishmentAlreadyExistsException(createEstablishmentDto.cnpj),
        );

      await expect(
        createEstablishmentUseCase.execute(createEstablishmentDto),
      ).rejects.toThrow(
        new EstablishmentAlreadyExistsException(createEstablishmentDto.cnpj)
          .message,
      );
    });

    it('should add available slots', async () => {
      await createEstablishmentUseCase.execute(createEstablishmentDto);
      expect(establishmentRepository.create).toHaveBeenCalledWith({
        ...createEstablishmentDto,
        availableCarSlots: createEstablishmentDto.carSlots,
        availableMotorcycleSlots: createEstablishmentDto.motorcycleSlots,
      });
      expect(establishmentRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should create a new establishment item successfully', async () => {
      const result = await createEstablishmentUseCase.execute(
        createEstablishmentDto,
      );
      const establishmentWithoutPassord = { ...establishment };
      delete establishmentWithoutPassord.password;
      expect(result).toEqual(establishmentWithoutPassord);
      expect(establishmentRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createEstablishmentUseCase.execute(createEstablishmentDto),
      ).rejects.toThrow('Error');
    });
  });
});
