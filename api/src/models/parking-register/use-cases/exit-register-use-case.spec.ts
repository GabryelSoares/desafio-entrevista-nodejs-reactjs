import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExitRegisterDto } from '../dto/exit-register.dto';
import { ParkingRegister } from '../entities/parking-register.entity';
import { FindOneParkingRegisterUseCase } from './find-one-parking-register-use-case';
import { ExitRegisterUseCase } from './exit-register-use-case';
import mocks from 'src/helpers/mocks';
import { EntryRegisterNotFoundException } from 'src/helpers/exceptions/EntryRegisterNotFoundException';
import mockdate from 'mockdate';

const vehicle = mocks.models.vehicle.createVehicle();
const establishment = mocks.models.establishment.createEstablishment();
const parkingRegister = mocks.models.parkingRegister.createParkingRegister({
  entry: new Date('2023-01-01T00:00:00.000Z'),
});

const exitRegisterDto: ExitRegisterDto = {
  vehiclePlate: vehicle.plate,
  establishmentId: establishment.id,
};
const updatedParkingRegister = new ParkingRegister({
  ...parkingRegister,
  exit: new Date('2023-01-01T01:00:00.000Z'),
});

describe('ExitRegisterUseCase', () => {
  let findOneParkingRegisterUseCase: FindOneParkingRegisterUseCase;
  let updateParkingRegisterUseCase: ExitRegisterUseCase;
  let parkingRegisterRepository: Repository<ParkingRegister>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExitRegisterUseCase,
        FindOneParkingRegisterUseCase,
        {
          provide: getRepositoryToken(ParkingRegister),
          useValue: {
            merge: jest.fn().mockReturnValue(updatedParkingRegister),
            findOneBy: jest.fn().mockResolvedValue(parkingRegister),
            findOneByOrFail: jest.fn().mockResolvedValue(parkingRegister),
            save: jest.fn().mockResolvedValue(updatedParkingRegister),
            update: jest.fn().mockResolvedValue(updatedParkingRegister),
          },
        },
      ],
    }).compile();

    updateParkingRegisterUseCase =
      module.get<ExitRegisterUseCase>(ExitRegisterUseCase);
    parkingRegisterRepository = module.get<Repository<ParkingRegister>>(
      getRepositoryToken(ParkingRegister),
    );
    findOneParkingRegisterUseCase = module.get<FindOneParkingRegisterUseCase>(
      FindOneParkingRegisterUseCase,
    );
    mockdate.set(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    // Após cada teste, redefina a data atual para o valor real
    mockdate.reset();
  });

  it('should be defined', () => {
    expect(findOneParkingRegisterUseCase).toBeDefined();
    expect(updateParkingRegisterUseCase).toBeDefined();
    expect(parkingRegisterRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw an exception if entry register not found', async () => {
      jest
        .spyOn(parkingRegisterRepository, 'findOneBy')
        .mockRejectedValueOnce(
          new EntryRegisterNotFoundException(exitRegisterDto.vehiclePlate),
        );
      await expect(
        updateParkingRegisterUseCase.execute(exitRegisterDto),
      ).rejects.toThrow(
        new EntryRegisterNotFoundException(exitRegisterDto.vehiclePlate)
          .message,
      );
    });

    it('should update a new parkingRegister item successfully', async () => {
      mockdate.set(new Date('2023-01-01T01:00:00.000Z'));
      jest
        .spyOn(parkingRegisterRepository, 'save')
        .mockResolvedValueOnce(updatedParkingRegister);
      const result =
        await updateParkingRegisterUseCase.execute(exitRegisterDto);

      expect(result).toEqual(updatedParkingRegister);
      expect(parkingRegisterRepository.save).toHaveBeenCalledWith(
        updatedParkingRegister,
      );
      expect(parkingRegisterRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(parkingRegisterRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        updateParkingRegisterUseCase.execute(exitRegisterDto),
      ).rejects.toThrow('Error');
    });
  });
});
