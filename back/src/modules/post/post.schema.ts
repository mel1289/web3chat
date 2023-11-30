import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/user/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  _id: string;

  @Prop()
  content: string;

  @Prop()
  likes: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
