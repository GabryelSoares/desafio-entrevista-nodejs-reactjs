import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';

export const createVehicle = (data?: Partial<Vehicle>) =>
  new Vehicle({
    id: 1,
    brand: 'Honda',
    model: 'Biz',
    color: 'Branca',
    plate: 'AAA-0A00',
    type: VehicleTypeEnum.MOTORCYCLE,
    ...data,
  });
