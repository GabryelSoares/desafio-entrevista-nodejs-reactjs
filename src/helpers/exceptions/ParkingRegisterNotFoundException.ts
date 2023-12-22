import { NotFoundException } from '@nestjs/common';

export class ParkingRegisterNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Parking register with ${id} not found`);
  }
}
