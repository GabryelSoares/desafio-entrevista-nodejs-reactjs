import { Injectable } from '@nestjs/common';

@Injectable()
export class EstablishmentService {
  findOne(id: number) {
    return `This action returns a #${id} establishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
