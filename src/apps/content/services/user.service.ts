// content/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { User } from 'src/libs/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async update(userId: string, updateData: Partial<User>): Promise<User> {
    return this.userRepository.update(userId, updateData);
  }
}
