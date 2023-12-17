import { Test, TestingModule } from '@nestjs/testing';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';

describe('FindOneEstablishmentUseCase', () => {
  let findOneEstablishmentUseCase: FindOneEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneEstablishmentUseCase],
    }).compile();

    findOneEstablishmentUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(findOneEstablishmentUseCase).toBeDefined();
  });
});
