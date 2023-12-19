import { Establishment } from 'src/models/establishment/entities/establishment.entity';

export const createEstablishment = (data?: Partial<Establishment>) =>
  new Establishment({
    id: 1,
    name: 'Sea Parking',
    cnpj: `00.000.000/0000-0`,
    password: 'senha',
    address: 'test@gmail.com',
    phone: `99 99999-0000`,
    motorcycleSlots: 10,
    carSlots: 10,
    ...data,
  });
