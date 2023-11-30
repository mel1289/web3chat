import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/user.schema';
import { PostService } from '../post/post.service';
import { Like } from './like.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    @Inject(forwardRef(() => PostService)) private postService: PostService,
  ) {}

  async likePost(user: User, postId: string) {
    let post = await this.postService.findById(postId);

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    let alreadyLiked: boolean = await this.isUserLiked(user, postId);

    if (alreadyLiked) {
      throw new HttpException('Already liked', HttpStatus.CONFLICT);
    }

    let like = new this.likeModel();

    like.user = user;
    like.post = post;

    return like.save();
  }

  async unlikePost(user: User, postId: string) {
    let post = await this.postService.findById(postId);

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    return this.likeModel.deleteOne({
      user,
      post,
    });
  }

  async nbrOfLikes(postId: string): Promise<number> {
    let nbr = await this.likeModel.count({
      post: postId,
    });

    return nbr;
  }

  async isUserLiked(user: User, postId: string): Promise<boolean> {
    let post = await this.postService.findById(postId);

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    let liked = await this.likeModel.findOne({
      user,
      post,
    });

    if (liked) {
      return true;
    } else {
      return false;
    }
  }

  async findByPostId(id: string): Promise<Like> {
    return this.likeModel.findOne({ id });
  }
}
