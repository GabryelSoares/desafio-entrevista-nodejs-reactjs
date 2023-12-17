import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({
  imports: [EstablishmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
