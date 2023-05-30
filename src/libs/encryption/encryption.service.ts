import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  async comparePasswords(
    incomingPassword: string,
    savedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(incomingPassword, savedPassword);
  }
}
