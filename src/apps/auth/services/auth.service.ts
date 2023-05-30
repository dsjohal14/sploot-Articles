import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { AuthSignupDto } from '../dtos/auth.signup.dto';
import { User } from 'src/libs/schemas/user.schema';
import { EncryptionService } from 'src/libs/encryption/encryption.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (
      user &&
      (await this.encryptionService.comparePasswords(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ userId: string; accessToken: string }> {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return {
        userId: user._id.toString(),
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async signUp(userDto: AuthSignupDto): Promise<User> {
    const { email, password } = userDto;

    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.encryptionService.hashPassword(password);
    const userToCreate: Partial<User> = {
      ...userDto,
      password: hashedPassword,
    };

    try {
      return this.usersRepository.create(userToCreate);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
