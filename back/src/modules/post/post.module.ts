import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { PostController } from './post.controller';
import { PostGateway } from './post.gateway';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
    forwardRef(() => LikeModule),
    forwardRef(() => CommentModule)
  ],

  controllers: [PostController],
  providers: [PostService, PostGateway],
  exports: [PostService],
})
export class PostModule {}
