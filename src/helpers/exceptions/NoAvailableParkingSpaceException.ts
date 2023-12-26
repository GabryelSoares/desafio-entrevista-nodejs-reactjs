import { BadRequestException } from '@nestjs/common';

export class NoAvailableParkingSpaceException extends BadRequestException {
  constructor() {
    super(`Não tem vaga disponível.`);
  }
}
