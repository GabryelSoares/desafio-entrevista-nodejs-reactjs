import { Test, TestingModule } from '@nestjs/testing';
import { EntryRegisterDto } from './dto/entry-register.dto';
import { ExitRegisterDto } from './dto/exit-register.dto';
import { ParkingRegister } from './entities/parking-register.entity';
import { ParkingRegisterController } from './parking-register.controller';
import { CreateParkingRegisterUseCase } from './use-cases/entry-register-use-case';
import { FindAllParkingRegistersUseCase } from './use-cases/find-all-parking-registers-use-case';
import { FindOneParkingRegisterUseCase } from './use-cases/find-one-parking-register-use-case';
import { RemoveParkingRegisterUseCase } from './use-cases/remove-parking-register-use-case';
import { ExitRegisterUseCase } from './use-cases/exit-register-use-case';
import mocks from 'src/helpers/mocks';

const vehicle = mocks.models.vehicle.createVehicle();
const establishment = mocks.models.establishment.createEstablishment();
const entryRegisterDto: EntryRegisterDto = {
  vehiclePlate: vehicle.plate,
  establishmentId: establishment.id,
};
const parkingRegisterList = mocks.models.parkingRegister.listRegisters();

const entry = new Date();
const exit = new Date(entry.getTime() + 60 * 60 * 1000);
const entryRegister = mocks.models.parkingRegister.createParkingRegister({
  entry,
});
const exitRegisterDto: ExitRegisterDto = {
  vehiclePlate: vehicle.plate,
  establishmentId: establishment.id,
};
const exitRegister: ParkingRegister = new ParkingRegister({
  ...entryRegister,
  exit,
});

describe('ParkingRegisterController', () => {
  let controller: ParkingRegisterController;
  let createParkingRegisterUseCase: CreateParkingRegisterUseCase;
  let findAllParkingRegistersUseCase: FindAllParkingRegistersUseCase;
  let findOneParkingRegisterUseCase: FindOneParkingRegisterUseCase;
  let removeParkingRegisterUseCase: RemoveParkingRegisterUseCase;
  let exitRegisterUseCase: ExitRegisterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingRegisterController],
      providers: [
        {
          provide: CreateParkingRegisterUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(entryRegister),
          },
        },
        {
          provide: FindAllParkingRegistersUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(parkingRegisterList),
          },
        },
        {
          provide: FindOneParkingRegisterUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(parkingRegisterList[0]),
          },
        },
        {
          provide: RemoveParkingRegisterUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ExitRegisterUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(exitRegister),
          },
        },
      ],
    }).compile();

    controller = module.get<ParkingRegisterController>(
      ParkingRegisterController,
    );
    createParkingRegisterUseCase = module.get<CreateParkingRegisterUseCase>(
      CreateParkingRegisterUseCase,
    );
    findAllParkingRegistersUseCase = module.get<FindAllParkingRegistersUseCase>(
      FindAllParkingRegistersUseCase,
    );
    findOneParkingRegisterUseCase = module.get<FindOneParkingRegisterUseCase>(
      FindOneParkingRegisterUseCase,
    );
    removeParkingRegisterUseCase = module.get<RemoveParkingRegisterUseCase>(
      RemoveParkingRegisterUseCase,
    );
    exitRegisterUseCase = module.get<ExitRegisterUseCase>(ExitRegisterUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createParkingRegisterUseCase).toBeDefined();
    expect(findAllParkingRegistersUseCase).toBeDefined();
    expect(findOneParkingRegisterUseCase).toBeDefined();
    expect(removeParkingRegisterUseCase).toBeDefined();
    expect(exitRegisterUseCase).toBeDefined();
  });

  describe('find-all', () => {
    it('should return a parkingRegisters list successfully', async () => {
      const result = await findAllParkingRegistersUseCase.execute();

      expect(result).toEqual(parkingRegisterList);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findAllParkingRegistersUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findAllParkingRegistersUseCase.execute()).rejects.toThrow('Error');
    });
  });

  describe('find-one', () => {
    it('should get a parkingRegister successfully', async () => {
      const result = await findOneParkingRegisterUseCase.execute(1);

      expect(result).toEqual(parkingRegisterList[0]);
      expect(findOneParkingRegisterUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findOneParkingRegisterUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findOneParkingRegisterUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findOneParkingRegisterUseCase.execute(1)).rejects.toThrow('Error');
    });
  });

  describe('entry', () => {
    it('should create a new parkingRegister successfully', async () => {
      const result =
        await createParkingRegisterUseCase.execute(entryRegisterDto);

      expect(result).toEqual(entryRegister);
      expect(createParkingRegisterUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createParkingRegisterUseCase.execute).toHaveBeenCalledWith(
        entryRegisterDto,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(createParkingRegisterUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createParkingRegisterUseCase.execute(entryRegisterDto),
      ).rejects.toThrow('Error');
    });
  });

  describe('exit', () => {
    it('should exit a parkingRegister item successfully', async () => {
      const result = await exitRegisterUseCase.execute(exitRegisterDto);

      expect(result).toEqual(exitRegister);
      expect(exitRegisterUseCase.execute).toHaveBeenCalledTimes(1);
      expect(exitRegisterUseCase.execute).toHaveBeenCalledWith(
        entryRegisterDto,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(exitRegisterUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(exitRegisterUseCase.execute(exitRegisterDto)).rejects.toThrow(
        'Error',
      );
    });
  });

  describe('remove', () => {
    it('should remove a parkingRegister item successfully', async () => {
      const result = await removeParkingRegisterUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(removeParkingRegisterUseCase.execute).toHaveBeenCalledTimes(1);
      expect(removeParkingRegisterUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(removeParkingRegisterUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeParkingRegisterUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
