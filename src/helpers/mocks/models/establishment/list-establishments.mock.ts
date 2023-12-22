import { Establishment } from 'src/models/establishment/entities/establishment.entity';

export const listEstablishments = (quantity = 4) => {
  return new Array(quantity).fill(null).map((_, index) => {
    new Establishment({
      id: index + 1,
      name: 'Parking - ' + index,
      cnpj: `00.000.000/${index.toString().padStart(4, '0')}-0`,
      email: index + 'test@gmail.com',
      password: 'senha',
      address: 'avenida teste, 123',
      phone: `99 99999-${index.toString().padStart(4, '0')}`,
      motorcycleSlots: 10,
      carSlots: 10,
    });
  });
};
