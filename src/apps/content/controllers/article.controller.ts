import { Controller, Get, UseGuards } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { JwtAuthGuard } from 'src/apps/auth/gaurds/jwt-auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllArticles() {
    return this.articleService.getArticles();
  }
}
