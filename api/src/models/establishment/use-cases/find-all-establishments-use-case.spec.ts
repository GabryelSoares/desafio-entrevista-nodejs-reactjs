import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindAllEstablishmentsUseCase } from './find-all-establishments-use-case';

const establishmentsList = [
  new Establishment({
    id: 1,
    name: 'SeaPark',
    cnpj: '00.000.000/0000-00',
    password: 'senha',
    address: 'test@gmail.com',
    phone: '99 99999-9999',
    motorcycleSlots: 10,
    carSlots: 10,
  }),
  new Establishment({
    id: 2,
    name: 'Sea Park II',
    cnpj: '00.000.000/0000-00',
    password: 'senha',
    address: 'test@gmail.com',
    phone: '99 99999-9999',
    motorcycleSlots: 10,
    carSlots: 10,
  }),
];

describe('FindAllEstablishmentsUseCase', () => {
  let findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;
  let establishmentRepository: Repository<Establishment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllEstablishmentsUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            find: jest.fn().mockResolvedValue(establishmentsList),
          },
        },
      ],
    }).compile();

    findAllEstablishmentsUseCase = module.get<FindAllEstablishmentsUseCase>(
      FindAllEstablishmentsUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
  });

  it('should be defined', () => {
    expect(findAllEstablishmentsUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a establishment list successfully', async () => {
      const result = await findAllEstablishmentsUseCase.execute();

      expect(result).toEqual(establishmentsList);
      expect(establishmentRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'find')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findAllEstablishmentsUseCase.execute()).rejects.toThrow('Error');
    });
  });
});
