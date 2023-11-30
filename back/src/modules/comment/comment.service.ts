import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostService } from '../post/post.service';
import { User } from '../user/user.schema';
import { Comment } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @Inject(forwardRef(() => PostService)) private postService: PostService,
  ) {}

  async newComment(
    user: User,
    postId: string,
    content: string,
  ): Promise<Comment> {
    const post = await this.postService.findById(postId);

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    let comment = new this.commentModel();

    comment.content = content;
    comment.post = post;
    comment.user = user;
    comment.parentComment = null;

    return await comment.save();
  }

  async replyToComment(
    user: User,
    commentId: string,
    content: string,
  ): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new HttpException('Comment not found.', HttpStatus.CONFLICT);
    }

    let reply = new this.commentModel();

    reply.content = content;
    reply.post = null;
    reply.user = user;
    reply.parentComment = comment;

    return await reply.save();
  }

  async findPostComments(postId: string): Promise<Comment[]> {
    const post = await this.postService.findById(postId);

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    const comments = await this.commentModel.find({ post });

    return comments;
  }

  async nbrOfComments(postId: string): Promise<number> {
    let nbr = await this.commentModel.count({
      post: postId,
    });

    return nbr;
  }

  async nbrOfCommentReplies(commentId: string): Promise<number> {
    let nbr = await this.commentModel.count({
      parentComment: commentId,
    });

    return nbr;
  }

  async findCommentReplies(commentId: string): Promise<Comment[]> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new HttpException('Post not found.', HttpStatus.CONFLICT);
    }

    const replies = await this.commentModel.find({ parentComment: comment });

    return replies;
  }
}
