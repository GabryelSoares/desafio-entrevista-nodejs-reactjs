import { ParkingRegister } from 'src/models/parking-register/entities/parking-register.entity';
import mocks from 'src/helpers/mocks';

export const listRegisters = (quantity = 4) => {
  return new Array(quantity).fill(null).map((_, index) => {
    const entryTime = new Date();
    const exitTime =
      index % 2 === 0 ? new Date(entryTime.getTime() + 60 * 60 * 1000) : null;

    return new ParkingRegister({
      id: index + 1,
      entry: entryTime,
      exit: exitTime,
      vehicle: mocks.models.vehicle.createVehicle(),
      establishment: mocks.models.establishment.createEstablishment(),
    });
  });
};
