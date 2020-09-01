import { Module } from '@nestjs/common';
import { GarbageModule } from './garbage/garbage.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GarbageModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
