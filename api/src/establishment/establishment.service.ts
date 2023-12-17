import { Injectable } from '@nestjs/common';

@Injectable()
export class EstablishmentService {
  findAll() {
    return `This action returns all establishment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} establishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
