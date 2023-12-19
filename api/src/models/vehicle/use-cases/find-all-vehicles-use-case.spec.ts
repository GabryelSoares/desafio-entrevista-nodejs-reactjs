import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FindAllVehiclesUseCase } from './find-all-vehicles-use-case';
import mocks from 'src/helpers/mocks';

const vehiclesList = mocks.models.vehicle.listVehicles();

describe('FindAllVehiclesUseCase', () => {
  let findAllVehiclesUseCase: FindAllVehiclesUseCase;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllVehiclesUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            find: jest.fn().mockResolvedValue(vehiclesList),
          },
        },
      ],
    }).compile();

    findAllVehiclesUseCase = module.get<FindAllVehiclesUseCase>(
      FindAllVehiclesUseCase,
    );
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(findAllVehiclesUseCase).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a vehicle list successfully', async () => {
      const result = await findAllVehiclesUseCase.execute();

      expect(result).toEqual(vehiclesList);
      expect(vehicleRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(vehicleRepository, 'find')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findAllVehiclesUseCase.execute()).rejects.toThrow('Error');
    });
  });
});
