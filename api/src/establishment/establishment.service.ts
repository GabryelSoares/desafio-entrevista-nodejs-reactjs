import { Injectable } from '@nestjs/common';

@Injectable()
export class EstablishmentService {
  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
