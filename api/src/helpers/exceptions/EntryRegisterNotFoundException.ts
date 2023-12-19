import { NotFoundException } from '@nestjs/common';

export class EntryRegisterNotFoundException extends NotFoundException {
  constructor(plate: string) {
    super(`Vehicle with plate ${plate} has not entered or already exited`);
  }
}
