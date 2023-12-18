import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveEstablishmentUseCase {
  execute(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
