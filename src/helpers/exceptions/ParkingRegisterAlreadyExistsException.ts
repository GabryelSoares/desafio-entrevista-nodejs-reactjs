import { ConflictException } from '@nestjs/common';

export class ParkingRegisterAlreadyExistsException extends ConflictException {
  constructor(plate: string) {
    super(`Vehicle ${plate} is already parked.`);
  }
}
