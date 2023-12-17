import { Injectable } from '@nestjs/common';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentService {
  findAll() {
    return `This action returns all establishment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} establishment`;
  }

  update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    return `This action updates a #${id} establishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
