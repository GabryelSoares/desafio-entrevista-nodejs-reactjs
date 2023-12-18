import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';

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

describe('FindOneEstablishmentUseCase', () => {
  let findOneEstablishmentUseCase: FindOneEstablishmentUseCase;
  let establishmentRepository: Repository<Establishment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneEstablishmentUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            findOneByOrFail: jest.fn().mockResolvedValue(establishment),
          },
        },
      ],
    }).compile();

    findOneEstablishmentUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
  });

  it('should be defined', () => {
    expect(findOneEstablishmentUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a establishment item successfully', async () => {
      const result = await findOneEstablishmentUseCase.execute(1);

      expect(result).toEqual(establishment);
      expect(establishmentRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error() as never);

      expect(findOneEstablishmentUseCase.execute(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
