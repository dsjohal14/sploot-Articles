import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async update(userId: string, updateData: UpdateUserDto): Promise<boolean> {
    const user = await this.userRepository.update(userId, updateData);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return true;
  }
}
