import { NotFoundException } from '@nestjs/common';

export class ParkingRegisterNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Registro de estacionamento com o id ${id} não encontrado`);
  }
}
