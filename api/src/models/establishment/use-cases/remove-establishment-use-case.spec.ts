import { Test, TestingModule } from '@nestjs/testing';
import { RemoveEstablishmentUseCase } from './remove-establishment-use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();

describe('RemoveEstablishmentUseCase', () => {
  let findOneEstablishmentUseCase: FindOneEstablishmentUseCase;
  let removeEstablishmentUseCase: RemoveEstablishmentUseCase;
  let establishmentRepository: Repository<Establishment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveEstablishmentUseCase,
        FindOneEstablishmentUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            delete: jest.fn().mockReturnValue(undefined),
            findOneByOrFail: jest.fn().mockResolvedValue(establishment),
          },
        },
      ],
    }).compile();

    removeEstablishmentUseCase = module.get<RemoveEstablishmentUseCase>(
      RemoveEstablishmentUseCase,
    );
    findOneEstablishmentUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
  });

  it('should be defined', () => {
    expect(findOneEstablishmentUseCase).toBeDefined();
    expect(removeEstablishmentUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if establishment is not found', async () => {
      jest
        .spyOn(findOneEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(removeEstablishmentUseCase.execute(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove a establishment item successfully', async () => {
      const result = await removeEstablishmentUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(establishmentRepository.delete).toHaveBeenCalledWith(1);
      expect(establishmentRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'delete')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeEstablishmentUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
