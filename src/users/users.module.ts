import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { createUserMiddleware } from 'src/middleware/user-allowed.middleware';
import { CustomLoggerModule } from '../custom-logger/custom-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CustomLoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createUserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
