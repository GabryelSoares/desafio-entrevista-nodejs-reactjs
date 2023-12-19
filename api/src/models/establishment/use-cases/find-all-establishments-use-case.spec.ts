import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindAllEstablishmentsUseCase } from './find-all-establishments-use-case';
import mocks from 'src/helpers/mocks';

const establishmentsList = mocks.models.establishment.listEstablishments();

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
