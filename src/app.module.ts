import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { GarbageModule } from './garbage/garbage.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    GarbageModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    CacheModule.register({
      ttl: parseInt(process.env.CACHE_TTL) || 60 * 10,
      max: parseInt(process.env.CACHE_MAX) || 20,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
