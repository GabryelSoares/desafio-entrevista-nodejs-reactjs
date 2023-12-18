import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEstablishmentUseCase } from './update-establishment-use-case';

describe('UpdateEstablishmentUseCase', () => {
  let updateEstablishmentUseCase: UpdateEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEstablishmentUseCase],
    }).compile();

    updateEstablishmentUseCase = module.get<UpdateEstablishmentUseCase>(
      UpdateEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(updateEstablishmentUseCase).toBeDefined();
  });
});
