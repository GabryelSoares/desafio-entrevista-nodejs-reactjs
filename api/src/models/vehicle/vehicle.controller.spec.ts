import { Test, TestingModule } from '@nestjs/testing';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { CreateVehicleUseCase } from './use-cases/create-vehicle-use-case';
import { FindAllVehiclesUseCase } from './use-cases/find-all-vehicles-use-case';
import { FindOneVehicleUseCase } from './use-cases/find-one-vehicle-use-case';
import { RemoveVehicleUseCase } from './use-cases/remove-vehicle-use-case';
import { UpdateVehicleUseCase } from './use-cases/update-vehicle-use-case';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

const vehicleList: Vehicle[] = [
  new Vehicle({
    id: 1,
    brand: 'Honda',
    model: 'CG 160',
    color: 'Vermelha',
    plate: 'DDD-0A00',
    type: VehicleTypeEnum.MOTORCYCLE,
  }),
];

const newVehicle: Vehicle = new Vehicle({
  id: 1,
  brand: 'Honda',
  model: 'CG 160',
  color: 'Vermelha',
  plate: 'DDD-0A00',
  type: VehicleTypeEnum.MOTORCYCLE,
});

const updatedVehicle: Vehicle = new Vehicle({
  id: 1,
  brand: 'Honda',
  model: 'Biz',
  color: 'Branca',
  plate: 'AAA-0A00',
  type: VehicleTypeEnum.MOTORCYCLE,
});

describe('VehicleController', () => {
  let controller: VehicleController;
  let createVehicleUseCase: CreateVehicleUseCase;
  let findAllVehiclesUseCase: FindAllVehiclesUseCase;
  let findOneVehicleUseCase: FindOneVehicleUseCase;
  let removeVehicleUseCase: RemoveVehicleUseCase;
  let updateVehicleUseCase: UpdateVehicleUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: CreateVehicleUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(newVehicle),
          },
        },
        {
          provide: FindAllVehiclesUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(vehicleList),
          },
        },
        {
          provide: FindOneVehicleUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(vehicleList[0]),
          },
        },
        {
          provide: RemoveVehicleUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: UpdateVehicleUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(updatedVehicle),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    createVehicleUseCase =
      module.get<CreateVehicleUseCase>(CreateVehicleUseCase);
    findAllVehiclesUseCase = module.get<FindAllVehiclesUseCase>(
      FindAllVehiclesUseCase,
    );
    findOneVehicleUseCase = module.get<FindOneVehicleUseCase>(
      FindOneVehicleUseCase,
    );
    removeVehicleUseCase =
      module.get<RemoveVehicleUseCase>(RemoveVehicleUseCase);
    updateVehicleUseCase =
      module.get<UpdateVehicleUseCase>(UpdateVehicleUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createVehicleUseCase).toBeDefined();
    expect(findAllVehiclesUseCase).toBeDefined();
    expect(findOneVehicleUseCase).toBeDefined();
    expect(removeVehicleUseCase).toBeDefined();
    expect(updateVehicleUseCase).toBeDefined();
  });

  describe('find-all', () => {
    it('should return a vehicles list successfully', async () => {
      const result = await findAllVehiclesUseCase.execute();

      expect(result).toEqual(vehicleList);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findAllVehiclesUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findAllVehiclesUseCase.execute()).rejects.toThrow('Error');
    });
  });

  describe('find-one', () => {
    it('should get a vehicle successfully', async () => {
      const result = await findOneVehicleUseCase.execute(1);

      expect(result).toEqual(vehicleList[0]);
      expect(findOneVehicleUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findOneVehicleUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findOneVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findOneVehicleUseCase.execute(1)).rejects.toThrow('Error');
    });
  });

  describe('create', () => {
    it('should create a new vehicle successfully', async () => {
      const body: CreateVehicleDto = {
        brand: 'Honda',
        model: 'CG 160',
        color: 'Vermelha',
        plate: 'DDD-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };
      const result = await createVehicleUseCase.execute(body);

      expect(result).toEqual(newVehicle);
      expect(createVehicleUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createVehicleUseCase.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateVehicleDto = {
        brand: 'Honda',
        model: 'CG 160',
        color: 'Vermelha',
        plate: 'DDD-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };
      jest
        .spyOn(createVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(createVehicleUseCase.execute(body)).rejects.toThrow('Error');
    });
  });

  describe('update', () => {
    it('should update a vehicle item successfully', async () => {
      const body: UpdateVehicleDto = {
        brand: 'Honda',
        model: 'Biz',
        color: 'Branca',
        plate: 'AAA-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };
      const result = await updateVehicleUseCase.execute(1, body);

      expect(result).toEqual(updatedVehicle);
      expect(updateVehicleUseCase.execute).toHaveBeenCalledTimes(1);
      expect(updateVehicleUseCase.execute).toHaveBeenCalledWith(1, body);
    });

    it('should throw an exception', () => {
      const body: UpdateVehicleDto = {
        brand: 'Honda',
        model: 'Biz',
        color: 'Branca',
        plate: 'AAA-0A00',
        type: VehicleTypeEnum.MOTORCYCLE,
      };
      jest
        .spyOn(updateVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(updateVehicleUseCase.execute(1, body)).rejects.toThrow('Error');
    });
  });

  describe('remove', () => {
    it('should remove a vehicle item successfully', async () => {
      const result = await removeVehicleUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(removeVehicleUseCase.execute).toHaveBeenCalledTimes(1);
      expect(removeVehicleUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(removeVehicleUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeVehicleUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
