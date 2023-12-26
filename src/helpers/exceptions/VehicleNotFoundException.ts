import { NotFoundException } from '@nestjs/common';

export class VehicleNotFoundException extends NotFoundException {
  constructor(plate: string) {
    super(`Veículo com a placa ${plate} não encontrado!`);
  }
}
