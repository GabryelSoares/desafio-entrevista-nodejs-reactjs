import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllEstablishmentsUseCase {
  execute() {
    return `This action returns all establishment`;
  }
}
