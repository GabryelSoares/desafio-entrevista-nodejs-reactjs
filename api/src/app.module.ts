import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentModule } from './models/establishment/establishment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './models/vehicle/vehicle.module';
import { ParkingRegisterModule } from './models/parking-register/parking-register.module';

@Module({
  imports: [
    EstablishmentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'parking',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    VehicleModule,
    ParkingRegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
