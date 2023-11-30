import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { PostModule } from '../post/post.module';
import { LikeController } from './like.controller';
import { LikeGateway } from './like.gateway';
import { Like, LikeSchema } from './like.schema';
import { LikeService } from './like.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    UserModule,
    forwardRef(() => PostModule)
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeGateway],
  exports: [LikeService],
})
export class LikeModule {}
