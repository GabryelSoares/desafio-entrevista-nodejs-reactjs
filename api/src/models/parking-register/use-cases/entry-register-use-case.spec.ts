import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryRegisterDto } from '../dto/entry-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { CreateParkingRegisterUseCase } from './entry-register-use-case';
import mocks from 'src/helpers/mocks';
import { ParkingRegisterAlreadyExistsException } from 'src/helpers/exceptions/ParkingRegisterAlreadyExistsException';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
import { VehicleNotFoundException } from 'src/helpers/exceptions/VehicleNotFoundException';
import * as mockdate from 'mockdate';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';
import { EstablishmentNotFoundException } from 'src/helpers/exceptions/EstablishmentNotFoundException';

const vehicle = mocks.models.vehicle.createVehicle();
const establishment = mocks.models.establishment.createEstablishment();
const entryRegisterDto: EntryRegisterDto = {
  vehiclePlate: vehicle.plate,
  establishmentId: establishment.id,
};
const parkingRegister = new ParkingRegister({
  entry: new Date('2023-01-01T00:00:00.000Z'),
  vehicle,
  establishment,
});
describe('CreateParkingRegisterUseCase', () => {
  let createParkingRegisterUseCase: CreateParkingRegisterUseCase;
  let parkingRegisterRepository: Repository<ParkingRegister>;
  let vehicleRepository: Repository<Vehicle>;
  let establishmentRepository: Repository<Establishment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateParkingRegisterUseCase,
        {
          provide: getRepositoryToken(ParkingRegister),
          useValue: {
            create: jest.fn().mockReturnValue(parkingRegister),
            save: jest.fn().mockResolvedValue(parkingRegister),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            findOneByOrFail: jest.fn().mockResolvedValue(vehicle),
          },
        },
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            findOneByOrFail: jest.fn().mockResolvedValue(establishment),
          },
        },
      ],
    }).compile();

    createParkingRegisterUseCase = module.get<CreateParkingRegisterUseCase>(
      CreateParkingRegisterUseCase,
    );
    parkingRegisterRepository = module.get<Repository<ParkingRegister>>(
      getRepositoryToken(ParkingRegister),
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
    mockdate.set(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    // Após cada teste, redefina a data atual para o valor real
    mockdate.reset();
  });

  it('should be defined', () => {
    expect(createParkingRegisterUseCase).toBeDefined();
    expect(parkingRegisterRepository).toBeDefined();
    expect(vehicleRepository).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw an exception if vehicle not found', async () => {
      jest
        .spyOn(vehicleRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(
          new VehicleNotFoundException(entryRegisterDto.vehiclePlate),
        );
      await expect(
        createParkingRegisterUseCase.execute(entryRegisterDto),
      ).rejects.toThrow(
        new VehicleNotFoundException(entryRegisterDto.vehiclePlate).message,
      );
    });

    it('should throw an exception if establishment not found', async () => {
      jest
        .spyOn(establishmentRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(
          new EstablishmentNotFoundException(entryRegisterDto.establishmentId),
        );
      await expect(
        createParkingRegisterUseCase.execute(entryRegisterDto),
      ).rejects.toThrow(
        new EstablishmentNotFoundException(entryRegisterDto.establishmentId)
          .message,
      );
    });

    it('should throw an exception if vehicle already parked', async () => {
      jest
        .spyOn(parkingRegisterRepository, 'findOneBy')
        .mockRejectedValueOnce(
          new ParkingRegisterAlreadyExistsException(
            entryRegisterDto.vehiclePlate,
          ),
        );
      await expect(
        createParkingRegisterUseCase.execute(entryRegisterDto),
      ).rejects.toThrow(
        new ParkingRegisterAlreadyExistsException(entryRegisterDto.vehiclePlate)
          .message,
      );
    });

    it('should create a new parkingRegister item successfully', async () => {
      const result =
        await createParkingRegisterUseCase.execute(entryRegisterDto);

      expect(result).toEqual(parkingRegister);
      expect(parkingRegisterRepository.create).toHaveBeenCalledWith({
        vehicle: parkingRegister.vehicle,
        establishment: parkingRegister.establishment,
        entry: parkingRegister.entry,
      });
      expect(parkingRegisterRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(parkingRegisterRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createParkingRegisterUseCase.execute(entryRegisterDto),
      ).rejects.toThrow('Error');
    });
  });
});
