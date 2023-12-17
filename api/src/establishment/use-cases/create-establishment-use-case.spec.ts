import { Test, TestingModule } from '@nestjs/testing';
import { CreateEstablishmentUseCase } from './create-establishment-use-case';

describe('CreateEstablishmentUseCase', () => {
  let createEstablishmentUseCase: CreateEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateEstablishmentUseCase],
    }).compile();

    createEstablishmentUseCase = module.get<CreateEstablishmentUseCase>(
      CreateEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(createEstablishmentUseCase).toBeDefined();
  });
});
