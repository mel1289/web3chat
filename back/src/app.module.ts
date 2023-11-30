import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { LikeModule } from './modules/like/like.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/web3chat'),
    // Web3Module.forRoot("https://bsc-dataseed1.binance.org:443"),
    UserModule,
    PostModule,
    AuthModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentGateway],
})
export class AppModule {}
