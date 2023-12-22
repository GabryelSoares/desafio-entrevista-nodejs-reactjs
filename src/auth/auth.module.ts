import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './use-cases/sign-up-use-case';
import { JwtModule } from '@nestjs/jwt';
import { EstablishmentModule } from 'src/models/establishment/establishment.module';
import { SignInUseCase } from './use-cases/sign-in-use-case';

@Module({
  controllers: [AuthController],
  providers: [SignInUseCase, SignUpUseCase],
  imports: [
    EstablishmentModule,
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '10h' },
    }),
  ],
})
export class AuthModule {}
