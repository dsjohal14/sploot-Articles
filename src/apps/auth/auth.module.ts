import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionService } from 'src/libs/encryption/encryption.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/libs/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { JwtAuthGuard } from './gaurds/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('CONFIGS.JWT_SECRET'),
        signOptions: { expiresIn: 3600 },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    EncryptionService,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
