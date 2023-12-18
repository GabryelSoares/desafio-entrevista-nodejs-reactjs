import { Injectable } from '@nestjs/common';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';

@Injectable()
export class UpdateEstablishmentUseCase {
  execute(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    console.log('updateEstablishmentDto:: ', updateEstablishmentDto);
    return `This action updates a #${id} establishment`;
  }
}
