import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticleRepository } from 'src/libs/repositories/article.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async createArticle(userId: string, createArticleDto: CreateArticleDto) {
    return this.articleRepository.create(userId, createArticleDto);
  }
  async getArticles() {
    return this.articleRepository.getAllArticles();
  }
}
