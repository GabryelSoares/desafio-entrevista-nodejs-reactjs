import { HttpException, HttpStatus } from '@nestjs/common';

export class EstablishmentAlreadyExistsException extends HttpException {
  constructor(cnpj: string) {
    super(
      `Establishment with CNPJ ${cnpj} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
