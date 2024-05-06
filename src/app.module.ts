import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/typeorm-config.service';
import { ControllersModule } from './controllers/controllers.module';
import { ServicesModule } from './services/services.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(Configuration.getTypeOrmConfig()),
    ControllersModule,
    ServicesModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
