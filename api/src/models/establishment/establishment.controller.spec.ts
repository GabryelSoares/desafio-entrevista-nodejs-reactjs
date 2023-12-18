import { Test, TestingModule } from '@nestjs/testing';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentController } from './establishment.controller';
import { CreateEstablishmentUseCase } from './use-cases/create-establishment-use-case';
import { FindAllEstablishmentsUseCase } from './use-cases/find-all-establishments-use-case';
import { FindOneEstablishmentUseCase } from './use-cases/find-one-establishment-use-case';
import { RemoveEstablishmentUseCase } from './use-cases/remove-establishment-use-case';
import { UpdateEstablishmentUseCase } from './use-cases/update-establishment-use-case';

const establishmentList: Establishment[] = [
  new Establishment({
    id: 1,
    name: 'SeaPark',
    cnpj: '00.000.000/0000-00',
    password: 'senha',
    address: 'test@gmail.com',
    phone: '99 99999-9999',
    motorcycleSlots: 10,
    carSlots: 10,
  }),
];

const newEstablishment: Establishment = new Establishment({
  id: 1,
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-9999',
  motorcycleSlots: 10,
  carSlots: 10,
});

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
        { provide: RemoveEstablishmentUseCase, useValue: jest.fn() },
        { provide: UpdateEstablishmentUseCase, useValue: jest.fn() },
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
      const body: CreateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-9999',
        motorcycleSlots: 10,
        carSlots: 10,
      };
      const result = await createEstablishmentUseCase.execute(body);

      expect(result).toEqual(newEstablishment);
      expect(createEstablishmentUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createEstablishmentUseCase.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-9999',
        motorcycleSlots: 10,
        carSlots: 10,
      };
      jest
        .spyOn(createEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Error') as never);

      expect(createEstablishmentUseCase.execute(body)).rejects.toThrow('Error');
    });
  });
});
