import { NotFoundException } from '@nestjs/common';

export class EstablishmentNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Establishment with id ${id} already exists`);
  }
}
