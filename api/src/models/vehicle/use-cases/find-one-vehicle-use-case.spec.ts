import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

const vehicle = new Vehicle({
  id: 1,
  brand: 'Honda',
  model: 'Biz',
  color: 'Branca',
  plate: 'AAA-0A00',
  type: VehicleTypeEnum.MOTORCYCLE,
});

describe('FindOneVehicleUseCase', () => {
  let findOneVehicleUseCase: FindOneVehicleUseCase;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneVehicleUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            findOneByOrFail: jest.fn().mockResolvedValue(vehicle),
          },
        },
      ],
    }).compile();

    findOneVehicleUseCase = module.get<FindOneVehicleUseCase>(
      FindOneVehicleUseCase,
    );
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(findOneVehicleUseCase).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a vehicle item successfully', async () => {
      const result = await findOneVehicleUseCase.execute(1);

      expect(result).toEqual(vehicle);
      expect(vehicleRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(vehicleRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error() as never);

      expect(findOneVehicleUseCase.execute(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
