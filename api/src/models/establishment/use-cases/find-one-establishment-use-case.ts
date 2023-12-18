import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOneEstablishmentUseCase {
  execute(id: number) {
    return `This action returns a #${id} establishment`;
  }
}
