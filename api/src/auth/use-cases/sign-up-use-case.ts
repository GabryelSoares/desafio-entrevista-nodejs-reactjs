import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { FindEstablishmentByEmailUseCase } from 'src/models/establishment/use-cases/find-establishment-by-email-use-case';
import { CreateEstablishmentDto } from 'src/models/establishment/dto/create-establishment.dto';
import { EmailAlreadyRegistered } from 'src/helpers/exceptions/EmailAlreadyRegistered';
import { CreateEstablishmentUseCase } from 'src/models/establishment/use-cases/create-establishment-use-case';

const scrypt = promisify(_scrypt);

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly createEstablishmentUseCase: CreateEstablishmentUseCase,
    private readonly findEstablishmentByEmailUseCase: FindEstablishmentByEmailUseCase,
    private jwtService: JwtService,
  ) {}

  async execute(createEstablishmentDto: CreateEstablishmentDto) {
    const existingEstablishment =
      await this.findEstablishmentByEmailUseCase.execute(
        createEstablishmentDto.email,
      );
    if (existingEstablishment) {
      throw new EmailAlreadyRegistered(createEstablishmentDto.email);
    }

    createEstablishmentDto.password = await this.hashPassword(
      createEstablishmentDto.password,
    );
    const createdEstablishment = await this.createEstablishmentUseCase.execute(
      createEstablishmentDto,
    );

    return {
      establishment: createdEstablishment,
      accessToken: await this.jwtService.signAsync({
        username: createdEstablishment.email,
        sub: createdEstablishment.id,
      }),
    };
  }

  private async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return salt + '.' + hash.toString('hex');
  }
}
