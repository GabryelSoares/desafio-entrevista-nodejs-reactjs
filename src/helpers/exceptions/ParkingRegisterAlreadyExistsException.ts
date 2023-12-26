import { ConflictException } from '@nestjs/common';

export class ParkingRegisterAlreadyExistsException extends ConflictException {
  constructor(plate: string) {
    super(`Veículo ${plate} já está estacionado.`);
  }
}
