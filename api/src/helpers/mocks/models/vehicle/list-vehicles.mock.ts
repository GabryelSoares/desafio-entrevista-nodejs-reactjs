import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
import mocks from '../..';

export const listVehicles = (quantity = 4) => {
  return new Array(quantity).fill(null).map((_, index) => {
    if (index % 2 === 0) {
      return new Vehicle({
        id: index + 1,
        plate: `AAA-1A${index.toString().padStart(2, '0')}`,
        model: 'CG 160',
        color: 'Azul',
        type: VehicleTypeEnum.MOTORCYCLE,
        parkingRegisters: mocks.models.parkingRegister.listRegisters(),
      });
    }
    return new Vehicle({
      id: index + 1,
      plate: `AAA-1A${index.toString().padStart(2, '0')}`,
      model: 'Fusca',
      color: 'Azul',
      type: VehicleTypeEnum.CAR,
    });
  });
};
