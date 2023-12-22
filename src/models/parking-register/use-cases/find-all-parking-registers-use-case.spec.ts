import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingRegister } from '../entities/parking-register.entity';
import { FindAllParkingRegistersUseCase } from './find-all-parking-registers-use-case';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();
const parkingRegistersList = mocks.models.parkingRegister.listRegisters({
  defaultValues: { establishment },
});

describe('FindAllParkingRegistersUseCase', () => {
  let findAllParkingRegistersUseCase: FindAllParkingRegistersUseCase;
  let parkingRegisterRepository: Repository<ParkingRegister>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllParkingRegistersUseCase,
        {
          provide: getRepositoryToken(ParkingRegister),
          useValue: {
            find: jest.fn().mockResolvedValue(parkingRegistersList),
          },
        },
      ],
    }).compile();

    findAllParkingRegistersUseCase = module.get<FindAllParkingRegistersUseCase>(
      FindAllParkingRegistersUseCase,
    );
    parkingRegisterRepository = module.get<Repository<ParkingRegister>>(
      getRepositoryToken(ParkingRegister),
    );
  });

  it('should be defined', () => {
    expect(findAllParkingRegistersUseCase).toBeDefined();
    expect(parkingRegisterRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a parkingRegister list successfully', async () => {
      const result = await findAllParkingRegistersUseCase.execute(
        establishment.id,
      );

      expect(result).toEqual(parkingRegistersList);
      expect(parkingRegisterRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(parkingRegisterRepository, 'find')
        .mockRejectedValueOnce(new Error('Error'));

      expect(
        findAllParkingRegistersUseCase.execute(establishment.id),
      ).rejects.toThrow('Error');
    });
  });
});
