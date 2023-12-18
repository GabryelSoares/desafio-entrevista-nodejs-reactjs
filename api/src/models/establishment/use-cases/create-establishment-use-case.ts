import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';

@Injectable()
export class CreateEstablishmentUseCase {
  execute(createEstablishmentDto: CreateEstablishmentDto) {
    console.log('createEstablishmentDto:: ', createEstablishmentDto);
    return 'This action adds a new establishment';
  }
}
