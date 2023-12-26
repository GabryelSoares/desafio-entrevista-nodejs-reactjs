import { NotFoundException } from '@nestjs/common';

export class EntryRegisterNotFoundException extends NotFoundException {
  constructor(plate: string) {
    super(
      `Veículo com a placa ${plate} não entrou ou já saiu do estacionamento.`,
    );
  }
}
