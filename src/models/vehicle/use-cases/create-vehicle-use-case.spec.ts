import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleUseCase } from './create-vehicle-use-case';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { VehicleAlreadyExistsException } from 'src/helpers/exceptions/VehicleAlreadyExistsException';
import mocks from 'src/helpers/mocks';

const establishment = mocks.models.establishment.createEstablishment();
const vehicle = mocks.models.vehicle.createVehicle({ establishment });

describe('CreateVehicleUseCase', () => {
  let createVehicleUseCase: CreateVehicleUseCase;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateVehicleUseCase,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            create: jest.fn().mockResolvedValue(vehicle),
            save: jest.fn().mockResolvedValue(vehicle),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    createVehicleUseCase =
      module.get<CreateVehicleUseCase>(CreateVehicleUseCase);
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(createVehicleUseCase).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw an exception if vehicle with the same plate already exists', async () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'Honda',
        model: 'Biz',
        color: 'Branca',
        plate: 'AAA-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };

      jest
        .spyOn(vehicleRepository, 'findOneBy')
        .mockRejectedValueOnce(
          new VehicleAlreadyExistsException(createVehicleDto.plate),
        );

      await expect(
        createVehicleUseCase.execute(createVehicleDto, establishment.id),
      ).rejects.toThrow(
        new VehicleAlreadyExistsException(createVehicleDto.plate).message,
      );
    });

    it('should create a new vehicle item successfully', async () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'Honda',
        model: 'Biz',
        color: 'Branca',
        plate: 'AAA-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };

      jest.spyOn(vehicleRepository, 'findOneBy').mockResolvedValue(null);

      jest.spyOn(vehicleRepository, 'create').mockReturnValue(vehicle);
      jest.spyOn(vehicleRepository, 'save').mockResolvedValue(vehicle);

      const result = await createVehicleUseCase.execute(
        createVehicleDto,
        establishment.id,
      );

      expect(result).toEqual(vehicle);
      expect(vehicleRepository.findOneBy).toHaveBeenCalledWith({
        plate: createVehicleDto.plate,
        establishment: { id: establishment.id },
      });
      expect(vehicleRepository.create).toHaveBeenCalledWith({
        ...createVehicleDto,
        establishment: { id: establishment.id },
      });
      expect(vehicleRepository.create).toHaveBeenCalledTimes(1);
      expect(vehicleRepository.save).toHaveBeenCalledWith(vehicle);
      expect(vehicleRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'Honda',
        model: 'Biz',
        color: 'Branca',
        plate: 'AAA-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };
      jest
        .spyOn(vehicleRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createVehicleUseCase.execute(createVehicleDto, establishment.id),
      ).rejects.toThrow('Error');
    });
  });
});
