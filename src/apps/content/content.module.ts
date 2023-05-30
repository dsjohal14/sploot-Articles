import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/libs/schemas/article.schema';
import { User, UserSchema } from 'src/libs/schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from 'src/libs/repositories/user.repository';
import { ArticleController } from './controllers/article.controller';
import { ArticleRepository } from 'src/libs/repositories/article.repository';
import { ArticleService } from './services/article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [UserController, ArticleController],
  providers: [UserService, UserRepository, ArticleService, ArticleRepository],
})
export class ContentModule {}
