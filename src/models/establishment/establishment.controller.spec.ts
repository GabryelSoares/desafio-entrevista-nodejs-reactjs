import { Test, TestingModule } from '@nestjs/testing';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentController } from './establishment.controller';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { RemoveEstablishmentUseCase } from './use-cases/remove-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';
import mocks from 'src/helpers/mocks';
import { JwtService } from '@nestjs/jwt';

const establishmentList = mocks.models.establishment.listEstablishments();

const createEstablishmentDto: CreateEstablishmentDto = {
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  email: 'test@gmail.com',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-9999',
  motorcycleSlots: 10,
  carSlots: 10,
};
const newEstablishment = mocks.models.establishment.createEstablishment(
  createEstablishmentDto,
);

const updateEstablishmentDto: UpdateEstablishmentDto = {
  name: 'Beach Parking',
  cnpj: '00.000.000/0000-00',
  email: 'test@gmail.com',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-9999',
  motorcycleSlots: 20,
  carSlots: 20,
};
const updatedEstablishment = mocks.models.establishment.createEstablishment(
  updateEstablishmentDto,
);

describe('EstablishmentController', () => {
  let controller: EstablishmentController;
  let createEstablishmentUseCase: CreateEstablishmentUseCase;
  let findAllEstablishmentsUseCase: FindAllEstablishmentsUseCase;
  let findOneEstablishmentUseCase: FindOneEstablishmentUseCase;
  let removeEstablishmentUseCase: RemoveEstablishmentUseCase;
  let updateEstablishmentUseCase: UpdateEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController],
      providers: [
        JwtService,
        {
          provide: CreateEstablishmentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(newEstablishment),
          },
        },
        {
          provide: FindAllEstablishmentsUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(establishmentList),
          },
        },
        {
          provide: FindOneEstablishmentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(establishmentList[0]),
          },
        },
        {
          provide: RemoveEstablishmentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: UpdateEstablishmentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(updatedEstablishment),
          },
        },
      ],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
    createEstablishmentUseCase = module.get<CreateEstablishmentUseCase>(
      CreateEstablishmentUseCase,
    );
    findAllEstablishmentsUseCase = module.get<FindAllEstablishmentsUseCase>(
      FindAllEstablishmentsUseCase,
    );
    findOneEstablishmentUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
    removeEstablishmentUseCase = module.get<RemoveEstablishmentUseCase>(
      RemoveEstablishmentUseCase,
    );
    updateEstablishmentUseCase = module.get<UpdateEstablishmentUseCase>(
      UpdateEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createEstablishmentUseCase).toBeDefined();
    expect(findAllEstablishmentsUseCase).toBeDefined();
    expect(findOneEstablishmentUseCase).toBeDefined();
    expect(removeEstablishmentUseCase).toBeDefined();
    expect(updateEstablishmentUseCase).toBeDefined();
  });

  describe('find-all', () => {
    it('should return a establishments list successfully', async () => {
      const result = await findAllEstablishmentsUseCase.execute();

      expect(result).toEqual(establishmentList);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findAllEstablishmentsUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findAllEstablishmentsUseCase.execute()).rejects.toThrow('Error');
    });
  });

  describe('find-one', () => {
    it('should get a establishment successfully', async () => {
      const result = await findOneEstablishmentUseCase.execute(1);

      expect(result).toEqual(establishmentList[0]);
      expect(findOneEstablishmentUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findOneEstablishmentUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(findOneEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(findOneEstablishmentUseCase.execute(1)).rejects.toThrow('Error');
    });
  });

  describe('create', () => {
    it('should create a new establishment successfully', async () => {
      const result = await createEstablishmentUseCase.execute(
        createEstablishmentDto,
      );

      expect(result).toEqual(newEstablishment);
      expect(createEstablishmentUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createEstablishmentUseCase.execute).toHaveBeenCalledWith(
        createEstablishmentDto,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(createEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        createEstablishmentUseCase.execute(createEstablishmentDto),
      ).rejects.toThrow('Error');
    });
  });

  describe('update', () => {
    it('should update a establishment item successfully', async () => {
      const result = await updateEstablishmentUseCase.execute(
        1,
        updateEstablishmentDto,
      );

      expect(result).toEqual(updatedEstablishment);
      expect(updateEstablishmentUseCase.execute).toHaveBeenCalledTimes(1);
      expect(updateEstablishmentUseCase.execute).toHaveBeenCalledWith(
        1,
        updateEstablishmentDto,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(updateEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(
        updateEstablishmentUseCase.execute(1, updateEstablishmentDto),
      ).rejects.toThrow('Error');
    });
  });

  describe('remove', () => {
    it('should remove a establishment item successfully', async () => {
      const result = await removeEstablishmentUseCase.execute(1);

      expect(result).toBeUndefined();
      expect(removeEstablishmentUseCase.execute).toHaveBeenCalledTimes(1);
      expect(removeEstablishmentUseCase.execute).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(removeEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(removeEstablishmentUseCase.execute(1)).rejects.toThrow('Error');
    });
  });
});
