import { Controller, Put, Param, Body, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/apps/auth/gaurds/jwt-auth.guard';
import { User } from 'src/libs/schemas/user.schema';
import { UserService } from '../services/user.service';
import { GetUser } from 'src/apps/auth/decorators/get-user.decorator';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticleService } from '../services/article.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: Partial<User>,
  ) {
    return this.userService.update(userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ) {
    const { userId } = user;
    return this.articleService.createArticle(
      userId.toString(),
      createArticleDto,
    );
  }
}
