import {
  Controller,
  Param,
  Body,
  UseGuards,
  Post,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/apps/auth/gaurds/jwt-auth.guard';
import { User } from 'src/libs/schemas/user.schema';
import { UserService } from '../services/user.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticleService } from '../services/article.service';
import { GetUser } from 'src/apps/auth/decorators/get-user.decorator';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: UpdateUserDto,
  ) {
    const data = await this.userService.update(userId, updateData);
    return { message: 'Updated Successfully', data };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/articles')
  async createArticle(
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    const authenticatedUserId = user._id;
    if (authenticatedUserId.toString() !== userId) {
      throw new UnauthorizedException();
    }
    const data = await this.articleService.createArticle(
      userId,
      createArticleDto,
    );
    return { message: 'Created', data };
  }
}
