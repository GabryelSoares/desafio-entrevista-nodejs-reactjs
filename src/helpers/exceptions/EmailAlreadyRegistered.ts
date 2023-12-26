import { ConflictException } from '@nestjs/common';

export class EmailAlreadyRegistered extends ConflictException {
  constructor(email: string) {
    super(`O email ${email} já está registrado.`);
  }
}
