import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { Comment } from './comment.schema';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment';
import { CreateCommentReply } from './dtos/create-comment-reply.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async create(
    @CurrentUser() user,
    @Body() { postId, content }: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.newComment(user, postId, content);
  }

  @Post('/reply')
  @UseGuards(AuthGuard)
  async reply(
    @CurrentUser() user,
    { commentId, content }: CreateCommentReply,
  ): Promise<Comment> {
    return await this.commentService.replyToComment(user, commentId, content);
  }

  @Get('/:postId')
  @UseGuards(AuthGuard)
  async findPostComments(@Param() { postId }): Promise<Comment[]> {
    return await this.commentService.findPostComments(postId);
  }

  @Get('/replies/:commentId')
  @UseGuards(AuthGuard)
  async findCommentReplies(@Param() { commentId }): Promise<Comment[]> {
    return await this.commentService.findCommentReplies(commentId);
  }
}
