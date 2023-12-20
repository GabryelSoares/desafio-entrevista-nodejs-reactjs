import { Injectable, UnauthorizedException } from '@nestjs/common';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class SignInUseCase {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    private jwtService: JwtService,
  ) {}
  async execute(signInDto: SignInDto) {
    const existingEstablishment = await this.establishmentRepository.findOneBy({
      email: signInDto.email,
    });
    if (!existingEstablishment) {
      throw new UnauthorizedException();
    }
    const { password, ...establishment } = existingEstablishment;
    const [salt, storedHash] = password.split('.');
    const isValid = await this.verifyPassword({
      password: signInDto.password,
      salt,
      storedHash,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return {
      establishment,
      accessToken: await this.jwtService.signAsync({
        username: establishment.email,
        sub: establishment.id,
      }),
    };
  }

  async verifyPassword({
    password,
    salt,
    storedHash,
  }: {
    password: string;
    salt: string;
    storedHash: string;
  }) {
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return storedHash === hash.toString('hex');
  }
}
