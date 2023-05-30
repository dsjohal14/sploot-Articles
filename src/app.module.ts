import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './apps/auth/auth.module';
import { ContentModule } from './apps/content/content.module';
import { mongooseConnectionConfig } from './libs/connections/mongoose';
import envConfiguration from './configs/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync(mongooseConnectionConfig),
    AuthModule,
    ContentModule,
  ],
})
export class AppModule {}
