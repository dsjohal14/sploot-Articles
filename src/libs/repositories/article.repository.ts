// src/libs/repositories/article.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async create(
    userId: string,
    createArticleDto: Partial<Article>,
  ): Promise<Article> {
    const article = new this.articleModel({
      ...createArticleDto,
      author: userId,
    });
    return article.save();
  }

  async getAllArticles() {
    const populateOptions: PopulateOptions = { path: 'author', select: 'name' };
    return this.articleModel.find().populate(populateOptions);
  }
}
