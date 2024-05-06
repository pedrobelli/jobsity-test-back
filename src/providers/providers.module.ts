import { Module } from '@nestjs/common';
import { RequestInfoProvider } from './request-info/request-info.provider';

@Module({
  providers: [RequestInfoProvider],
  exports: [RequestInfoProvider],
})
export class ProvidersModule {}
