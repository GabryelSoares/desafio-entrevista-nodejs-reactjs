import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { FindOneVehicleUseCase } from './find-one-vehicle-use-case';
import { UpdateVehicleUseCase } from './update-vehicle-use-case';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();
const vehicle = mocks.models.vehicle.createVehicle({ establishment });

const updateVehicleDto: UpdateVehicleDto = {
  brand: 'Honda',
  model: 'CG 160',
  color: 'Vermelha',
  plate: 'DDD-0A00',
  type: VehicleTypeEnum.MOTORCYCLE,
};
const updatedVehicle = mocks.models.vehicle.createVehicle({
  ...updateVehicleDto,
  establishment,
});

describe('UpdateVehicleUseCase', () => {
  let updateVehicleUseCase: UpdateVehicleUseCase;
  let vehicleRepository: Repository<Vehicle>;
  let findOneVehicleUseCase: FindOneVehicleUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVehicleUseCase,
        FindOneVehicleUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            merge: jest.fn().mockResolvedValue(updatedVehicle),
            findOneByOrFail: jest.fn().mockResolvedValue(vehicle),
            save: jest.fn().mockResolvedValue(updatedVehicle),
            update: jest.fn().mockResolvedValue(updatedVehicle),
          },
        },
      ],
    }).compile();

    updateVehicleUseCase =
      module.get<UpdateVehicleUseCase>(UpdateVehicleUseCase);
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
    findOneVehicleUseCase = module.get<FindOneVehicleUseCase>(
      FindOneVehicleUseCase,
    );
  });

  it('should be defined', () => {
    expect(findOneVehicleUseCase).toBeDefined();
    expect(updateVehicleUseCase).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if vehicle is not found', async () => {
      jest
        .spyOn(findOneVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        updateVehicleUseCase.execute(1, updateVehicleDto, establishment.id),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update a new vehicle item successfully', async () => {
      jest
        .spyOn(vehicleRepository, 'save')
        .mockResolvedValueOnce(updatedVehicle);
      const result = await updateVehicleUseCase.execute(
        vehicle.id,
        updateVehicleDto,
        establishment.id,
      );
      expect(result).toEqual(updatedVehicle);

      expect(vehicleRepository.merge).toHaveBeenCalledWith(
        vehicle,
        updateVehicleDto,
      );
      expect(vehicleRepository.merge).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(vehicleRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        updateVehicleUseCase.execute(1, updateVehicleDto, establishment.id),
      ).rejects.toThrow('Error');
    });
  });
});
