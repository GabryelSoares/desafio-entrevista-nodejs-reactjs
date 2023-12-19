import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { CreateEstablishmentUseCase } from './create-establishment-use-case';
import { EstablishmentAlreadyExistsException } from 'src/helpers/exceptions/EstablishmentAlreadyExistsException';

const establishment = new Establishment({
  id: 1,
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-9999',
  motorcycleSlots: 10,
  carSlots: 10,
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
            create: jest.fn().mockReturnValue(establishment),
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
      const createEstablishmentDto: CreateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-9999',
        motorcycleSlots: 10,
        carSlots: 10,
      };

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

    it('should create a new establishment item successfully', async () => {
      const createEstablishmentDto: CreateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-9999',
        motorcycleSlots: 10,
        carSlots: 10,
      };
      const result = await createEstablishmentUseCase.execute(
        createEstablishmentDto,
      );

      expect(result).toEqual(establishment);
      expect(establishmentRepository.create).toHaveBeenCalledWith(
        createEstablishmentDto,
      );
      expect(establishmentRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const createEstablishmentDto: CreateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-9999',
        motorcycleSlots: 10,
        carSlots: 10,
      };
      jest
        .spyOn(establishmentRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createEstablishmentUseCase.execute(createEstablishmentDto),
      ).rejects.toThrow('Error');
    });
  });
});
