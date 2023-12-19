import { Test, TestingModule } from '@nestjs/testing';
import { RemoveVehicleUseCase } from './remove-vehicle-use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

describe('RemoveVehicleUseCase', () => {
  let findOneVehicleUseCase: FindOneVehicleUseCase;
  let removeVehicleUseCase: RemoveVehicleUseCase;
  let vehicleRepository: Repository<Vehicle>;

  const vehicle = new Vehicle({
    id: 1,
    brand: 'Honda',
    model: 'Biz',
    color: 'Branca',
    plate: 'AAA-0A00',
    type: VehicleTypeEnum.MOTORCYCLE,
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveVehicleUseCase,
        FindOneVehicleUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            delete: jest.fn().mockReturnValue(undefined),
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

      await expect(removeVehicleUseCase.execute(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove a vehicle item successfully', async () => {
      const result = await removeVehicleUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(vehicleRepository.delete).toHaveBeenCalledWith(1);
      expect(vehicleRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(vehicleRepository, 'delete')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeVehicleUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
