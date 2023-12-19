import { NotFoundException } from '@nestjs/common';

export class VehicleNotFoundException extends NotFoundException {
  constructor(plate: string) {
    super(`Vehicle with plate ${plate} already exists`);
  }
}
