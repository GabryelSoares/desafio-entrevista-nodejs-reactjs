import { Test, TestingModule } from '@nestjs/testing';
import { FindAllEstablishmentsUseCase } from './find-all-establishments-use-case';

describe('FindAllEstablishmentsUseCase', () => {
  let findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllEstablishmentsUseCase],
    }).compile();

    findAllEstablishmentsUseCase = module.get<FindAllEstablishmentsUseCase>(
      FindAllEstablishmentsUseCase,
    );
  });

  it('should be defined', () => {
    expect(findAllEstablishmentsUseCase).toBeDefined();
  });
});
