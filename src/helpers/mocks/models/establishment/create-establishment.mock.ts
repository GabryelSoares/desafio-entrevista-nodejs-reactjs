import { Establishment } from 'src/models/establishment/entities/establishment.entity';

export const createEstablishment = (data?: Partial<Establishment>) =>
  new Establishment({
    id: 1,
    name: 'Sea Parking',
    cnpj: `00.000.000/0000-0`,
    email: '1test@gmail.com',
    password: 'senha',
    address: 'avenida teste, 123',
    phone: `99 99999-0000`,
    motorcycleSlots: 10,
    carSlots: 10,
    availableCarSlots: 10,
    availableMotorcycleSlots: 10,
    ...data,
  });
