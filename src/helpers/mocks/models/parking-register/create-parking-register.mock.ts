import { ParkingRegister } from 'src/models/parking-register/entities/parking-register.entity';
import mocks from 'src/helpers/mocks';

export const createParkingRegister = (data?: Partial<ParkingRegister>) =>
  new ParkingRegister({
    entry: new Date(),
    vehicle: mocks.models.vehicle.createVehicle(),
    establishment: mocks.models.establishment.createEstablishment(),
    ...data,
  });
