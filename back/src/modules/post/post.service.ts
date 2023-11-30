import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/user.schema';
import { PostDetails } from 'src/utils/types';
import { CommentService } from '../comment/comment.service';
import { LikeService } from '../like/like.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @Inject(forwardRef(() => LikeService)) private likeService: LikeService,
    @Inject(forwardRef(() => CommentService)) private commmentService: CommentService,
  ) {}

  async create(user: User, { content }: CreatePostDto): Promise<PostDetails> {
    let post = new this.postModel();

    post.content = content;
    post.author = user;

    await post.save();

    return {
      post,
      nbrOfLikes: 0,
      nbrOfComments: 0,
      liked: false,
    };
  }

  async findPostWithDetails(user: User, postId: string): Promise<PostDetails> {
    const post = await this.findById(postId);

    const userLiked = await this.likeService.isUserLiked(user, post._id);
    const nbrOfLikes = await this.likeService.nbrOfLikes(post._id);
    const nbrOfComments = await this.commmentService.nbrOfComments(post._id);

    return {
      post,
      nbrOfLikes,
      nbrOfComments,
      liked: userLiked,
    };
  }

  async findAllPostWithDetails(user: User): Promise<PostDetails[]> {
    let posts = await this.postModel.find()
      .sort({ createdAt: -1 })
      .select({ _id: 1 });

    let results: Array<PostDetails> = [];

    for (let post of posts) {
      const data = await this.findPostWithDetails(user, post._id);
      results.push(data);
    }

    return results;
  }

  async findById(id: string): Promise<Post> {
    return this.postModel
      .findById(id)
      .populate('author', ['username', 'wallet']);
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel
      .find()
      .populate('author', ['username', 'wallet']);
  }
}
