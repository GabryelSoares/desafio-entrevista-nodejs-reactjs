import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

@Module({
  imports: [
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
