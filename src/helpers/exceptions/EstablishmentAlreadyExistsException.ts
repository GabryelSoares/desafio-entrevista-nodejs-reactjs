import { HttpException, HttpStatus } from '@nestjs/common';

export class EstablishmentAlreadyExistsException extends HttpException {
  constructor(cnpj: string) {
    super(
      `Já existe um estabelecimento cadastrado com o CNPJ ${cnpj}.`,
      HttpStatus.CONFLICT,
    );
  }
}
