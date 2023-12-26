import { NotFoundException } from '@nestjs/common';

export class EstablishmentNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Estabelecimento com o id ${id} não encontrado`);
  }
}
