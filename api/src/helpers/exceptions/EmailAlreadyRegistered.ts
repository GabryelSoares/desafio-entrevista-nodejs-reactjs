import { ConflictException } from '@nestjs/common';

export class EmailAlreadyRegistered extends ConflictException {
  constructor(email: string) {
    super(`The email ${email} is already registered.`);
  }
}
