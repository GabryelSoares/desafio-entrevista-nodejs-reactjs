import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { EstablishmentModule } from './models/establishment/establishment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './models/vehicle/vehicle.module';
import { ParkingRegisterModule } from './models/parking-register/parking-register.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ParkingRegisterController } from './models/parking-register/parking-register.controller';
import { VehicleController } from './models/vehicle/vehicle.controller';
import { AppController } from './app.controller';
import configuration from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.NEXT_PUBLIC_CLEARDB_DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    AuthModule,
    EstablishmentModule,
    VehicleModule,
    ParkingRegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ParkingRegisterController, VehicleController);
  }
}
