import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './apps/auth/auth.module';
import { mongooseConnectionConfig } from './libs/connections/mongoose';
import { ContentModule } from './apps/content/content.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongooseConnectionConfig),
    AuthModule,
    ContentModule,
  ],
})
export class AppModule {}
