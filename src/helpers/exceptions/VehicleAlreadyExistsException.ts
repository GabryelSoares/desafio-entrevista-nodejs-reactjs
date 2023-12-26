import { HttpException, HttpStatus } from '@nestjs/common';

export class VehicleAlreadyExistsException extends HttpException {
  constructor(plate: string) {
    super(`Veículo com a placa ${plate} já existe!`, HttpStatus.CONFLICT);
  }
}
