import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TaskController } from './task/task.controller';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  controllers: [TaskController, AuthController],
  imports: [
    ServicesModule,
    ProvidersModule
  ]
})
export class ControllersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'tasks', method: RequestMethod.ALL});
  }
}
