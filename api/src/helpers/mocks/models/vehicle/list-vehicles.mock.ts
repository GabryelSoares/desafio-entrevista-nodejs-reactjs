import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';

export const listVehicles = (quantity = 4) => {
  return new Array(quantity).fill(null).map((_, index) => {
    if (index % 2 === 0) {
      return new Vehicle({
        id: index + 1,
        plate: `AAA-1A3${index}`,
        model: 'CG 160',
        color: 'Azul',
        type: VehicleTypeEnum.MOTORCYCLE,
      });
    }
    return new Vehicle({
      id: index + 1,
      plate: `ABC-123${index}`,
      model: 'Fusca',
      color: 'Azul',
      type: VehicleTypeEnum.CAR,
    });
  });
};
