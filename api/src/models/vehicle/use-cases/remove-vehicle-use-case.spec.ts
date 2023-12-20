import { Test, TestingModule } from '@nestjs/testing';
import { RemoveVehicleUseCase } from './remove-vehicle-use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();
const vehicle = mocks.models.vehicle.createVehicle({ establishment });

describe('RemoveVehicleUseCase', () => {
  let findOneVehicleUseCase: FindOneVehicleUseCase;
  let removeVehicleUseCase: RemoveVehicleUseCase;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveVehicleUseCase,
        FindOneVehicleUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            delete: jest.fn().mockResolvedValue(undefined),
            findOneByOrFail: jest.fn().mockResolvedValue(vehicle),
          },
        },
      ],
    }).compile();

    removeVehicleUseCase =
      module.get<RemoveVehicleUseCase>(RemoveVehicleUseCase);
    findOneVehicleUseCase = module.get<FindOneVehicleUseCase>(
      FindOneVehicleUseCase,
    );
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(findOneVehicleUseCase).toBeDefined();
    expect(removeVehicleUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if vehicle is not found', async () => {
      jest
        .spyOn(findOneVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        removeVehicleUseCase.execute(1, vehicle.establishment.id),
      ).rejects.toThrow(NotFoundException);
    });

    it('should remove a vehicle item successfully', async () => {
      jest.spyOn(vehicleRepository, 'delete').mockResolvedValueOnce(undefined);
      const result = await removeVehicleUseCase.execute(
        vehicle.id,
        vehicle.establishment.id,
      );

      expect(vehicleRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest
        .spyOn(vehicleRepository, 'delete')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        removeVehicleUseCase.execute(1, vehicle.establishment.id),
      ).rejects.toThrow('Error');
    });
  });
});
