import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/libs/schemas/article.schema';
import { User, UserSchema } from 'src/libs/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ContentModule {}
