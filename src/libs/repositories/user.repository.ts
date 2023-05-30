import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(userId: string, updates: Partial<User>): Promise<User> {
    const allowedUpdates = { name: updates.name, age: updates.age };
    return this.userModel
      .findByIdAndUpdate(userId, allowedUpdates, { new: true })
      .exec();
  }
}
