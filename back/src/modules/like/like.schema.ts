import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/user/user.schema';
import { Post } from '../post/post.schema';

export type LikeDocument = Like & Document;

export enum LikeType {
  Post = 'post',
  Comment = 'comment',
}

@Schema({ timestamps: true })
export class Like {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
