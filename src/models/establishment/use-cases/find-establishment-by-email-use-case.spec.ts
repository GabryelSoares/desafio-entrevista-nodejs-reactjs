import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();

describe('FindOneEstablishmentUseCase', () => {
  let findByEstablishmentByEmailUseCase: FindOneEstablishmentUseCase;
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

    findByEstablishmentByEmailUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
  });

  it('should be defined', () => {
    expect(findByEstablishmentByEmailUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a establishment item successfully', async () => {
      const result = await findByEstablishmentByEmailUseCase.execute(1);

      expect(result).toEqual(establishment);
      expect(establishmentRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error() as never);

      expect(findByEstablishmentByEmailUseCase.execute(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
