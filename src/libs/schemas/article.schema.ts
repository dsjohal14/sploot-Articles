import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  articleId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User | mongoose.Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
