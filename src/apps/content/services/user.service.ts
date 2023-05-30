import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { User } from 'src/libs/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async update(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.update(userId, updateData);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
