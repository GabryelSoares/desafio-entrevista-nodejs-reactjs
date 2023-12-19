import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';
import { FindOneParkingRegisterUseCase } from './find-one-parking-register-use-case';
import { ParkingRegisterNotFoundException } from 'src/helpers/exceptions/ParkingRegisterNotFoundException';
import mocks from 'src/helpers/mocks';

const parkingRegister = mocks.models.parkingRegister.createParkingRegister();

describe('FindOneParkingRegisterUseCase', () => {
  let findOneParkingRegisterUseCase: FindOneParkingRegisterUseCase;
  let parkingRegisterRepository: Repository<ParkingRegister>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneParkingRegisterUseCase,
        {
          provide: getRepositoryToken(ParkingRegister),
          useValue: {
            findOneByOrFail: jest.fn().mockResolvedValue(parkingRegister),
          },
        },
      ],
    }).compile();

    findOneParkingRegisterUseCase = module.get<FindOneParkingRegisterUseCase>(
      FindOneParkingRegisterUseCase,
    );
    parkingRegisterRepository = module.get<Repository<ParkingRegister>>(
      getRepositoryToken(ParkingRegister),
    );
  });

  it('should be defined', () => {
    expect(findOneParkingRegisterUseCase).toBeDefined();
    expect(parkingRegisterRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a parkingRegister item successfully', async () => {
      const result = await findOneParkingRegisterUseCase.execute(1);

      expect(result).toEqual(parkingRegister);
      expect(parkingRegisterRepository.findOneByOrFail).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(parkingRegisterRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new ParkingRegisterNotFoundException(1));

      expect(findOneParkingRegisterUseCase.execute(1)).rejects.toThrow(
        ParkingRegisterNotFoundException,
      );
    });
  });
});
