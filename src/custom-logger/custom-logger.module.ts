import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Module({
  providers: [{ provide: 'CUSTOM_LOGGER', useClass: CustomLoggerService }],
  exports: ['CUSTOM_LOGGER'],
})
export class CustomLoggerModule {}
