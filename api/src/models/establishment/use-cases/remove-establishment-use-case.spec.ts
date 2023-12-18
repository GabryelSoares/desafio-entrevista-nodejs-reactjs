import { Test, TestingModule } from '@nestjs/testing';
import { RemoveEstablishmentUseCase } from './remove-establishment-use-case';

describe('RemoveEstablishmentUseCase', () => {
  let removeEstablishmentUseCase: RemoveEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveEstablishmentUseCase],
    }).compile();

    removeEstablishmentUseCase = module.get<RemoveEstablishmentUseCase>(
      RemoveEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(removeEstablishmentUseCase).toBeDefined();
  });
});
