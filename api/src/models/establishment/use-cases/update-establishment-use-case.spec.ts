import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { FindOneEstablishmentUseCase } from './find-one-establishment-use-case';
import { UpdateEstablishmentUseCase } from './update-establishment-use-case';

const establishment = new Establishment({
  id: 1,
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-0022',
  motorcycleSlots: 10,
  carSlots: 10,
});

const updatedEstablishment = new Establishment({
  id: 1,
  name: 'SeaPark',
  cnpj: '00.000.000/0000-00',
  password: 'senha',
  address: 'test@gmail.com',
  phone: '99 99999-0022',
  motorcycleSlots: 30,
  carSlots: 30,
});

describe('UpdateEstablishmentUseCase', () => {
  let updateEstablishmentUseCase: UpdateEstablishmentUseCase;
  let establishmentRepository: Repository<Establishment>;
  let findOneEstablishmentUseCase: FindOneEstablishmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEstablishmentUseCase,
        FindOneEstablishmentUseCase,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            merge: jest.fn().mockReturnValue(updatedEstablishment),
            findOneByOrFail: jest.fn().mockResolvedValue(establishment),
            save: jest.fn().mockResolvedValue(updatedEstablishment),
            update: jest.fn().mockResolvedValue(updatedEstablishment),
          },
        },
      ],
    }).compile();

    updateEstablishmentUseCase = module.get<UpdateEstablishmentUseCase>(
      UpdateEstablishmentUseCase,
    );
    establishmentRepository = module.get<Repository<Establishment>>(
      getRepositoryToken(Establishment),
    );
    findOneEstablishmentUseCase = module.get<FindOneEstablishmentUseCase>(
      FindOneEstablishmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(updateEstablishmentUseCase).toBeDefined();
    expect(establishmentRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if establishment is not found', async () => {
      jest
        .spyOn(findOneEstablishmentUseCase, 'execute')
        .mockRejectedValueOnce(new NotFoundException());
      const updateEstablishmentDto: UpdateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-0022',
        motorcycleSlots: 30,
        carSlots: 30,
      };

      await expect(
        updateEstablishmentUseCase.execute(1, updateEstablishmentDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update a new establishment item successfully', async () => {
      const updateEstablishmentDto: UpdateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-0022',
        motorcycleSlots: 30,
        carSlots: 30,
      };
      jest
        .spyOn(establishmentRepository, 'save')
        .mockResolvedValueOnce(updatedEstablishment);
      const result = await updateEstablishmentUseCase.execute(
        1,
        updateEstablishmentDto,
      );

      expect(result).toEqual(updatedEstablishment);
      expect(establishmentRepository.save).toHaveBeenCalledWith(
        updatedEstablishment,
      );
      expect(establishmentRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(establishmentRepository, 'save')
        .mockRejectedValueOnce(new Error('Error') as never);
      const updateEstablishmentDto: UpdateEstablishmentDto = {
        name: 'SeaPark',
        cnpj: '00.000.000/0000-00',
        password: 'senha',
        address: 'test@gmail.com',
        phone: '99 99999-0022',
        motorcycleSlots: 30,
        carSlots: 30,
      };

      expect(
        updateEstablishmentUseCase.execute(1, updateEstablishmentDto),
      ).rejects.toThrow('Error');
    });
  });
});
