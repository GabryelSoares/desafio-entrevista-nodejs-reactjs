import { Test, TestingModule } from '@nestjs/testing';
import { RemoveParkingRegisterUseCase } from './remove-parking-register-use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';
import { FindOneParkingRegisterUseCase } from './find-one-parking-register-use-case';
import { Repository } from 'typeorm';
import mocks from 'src/helpers/mocks';
import { ParkingRegisterNotFoundException } from 'src/helpers/exceptions/ParkingRegisterNotFoundException';

const vehicle = mocks.models.vehicle.createVehicle();
const establishment = mocks.models.establishment.createEstablishment();
const parkingRegister = new ParkingRegister({
  entry: new Date('2023-01-01T00:00:00.000Z'),
  vehicle,
  establishment,
});

describe('RemoveParkingRegisterUseCase', () => {
  let findOneParkingRegisterUseCase: FindOneParkingRegisterUseCase;
  let removeParkingRegisterUseCase: RemoveParkingRegisterUseCase;
  let parkingRegisterRepository: Repository<ParkingRegister>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveParkingRegisterUseCase,
        FindOneParkingRegisterUseCase,
        {
          provide: getRepositoryToken(ParkingRegister),
          useValue: {
            delete: jest.fn().mockReturnValue(undefined),
            findOneByOrFail: jest.fn().mockResolvedValue(parkingRegister),
          },
        },
      ],
    }).compile();

    removeParkingRegisterUseCase = module.get<RemoveParkingRegisterUseCase>(
      RemoveParkingRegisterUseCase,
    );
    findOneParkingRegisterUseCase = module.get<FindOneParkingRegisterUseCase>(
      FindOneParkingRegisterUseCase,
    );
    parkingRegisterRepository = module.get<Repository<ParkingRegister>>(
      getRepositoryToken(ParkingRegister),
    );
  });

  it('should be defined', () => {
    expect(findOneParkingRegisterUseCase).toBeDefined();
    expect(removeParkingRegisterUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if parkingRegister is not found', async () => {
      jest
        .spyOn(parkingRegisterRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new ParkingRegisterNotFoundException(1));

      await expect(removeParkingRegisterUseCase.execute(1)).rejects.toThrow(
        new ParkingRegisterNotFoundException(1).message,
      );
    });

    it('should remove a parkingRegister item successfully', async () => {
      const result = await removeParkingRegisterUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(parkingRegisterRepository.delete).toHaveBeenCalledWith(1);
      expect(parkingRegisterRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(parkingRegisterRepository, 'delete')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeParkingRegisterUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
