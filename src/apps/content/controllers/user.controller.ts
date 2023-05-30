// content/controllers/user.controller.ts
import {
  Controller,
  Put,
  Param,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/apps/auth/gaurds/jwt-auth.guard';
import { User } from 'src/libs/schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: Partial<User>,
    @Req() request: any,
  ): Promise<User> {
    if (request.user.userId !== userId) {
      throw new UnauthorizedException();
    }
    return this.userService.update(userId, updateData);
  }
}
