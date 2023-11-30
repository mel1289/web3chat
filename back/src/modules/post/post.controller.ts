import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/user/user.decorator';
import { User } from 'src/modules/user/user.schema';
import { PostDetails } from 'src/utils/types';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async create(
    @CurrentUser() user: User,
    @Body() input: CreatePostDto,
  ): Promise<PostDetails> {
    return await this.postService.create(user, input);
  }

  @Get('/:postId')
  @UseGuards(AuthGuard)
  async find(@CurrentUser() user, @Param() { postId }) {
    console.log(postId);
    return await this.postService.findPostWithDetails(user, postId);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async findAll(@CurrentUser() user: User): Promise<PostDetails[]> {
    return await this.postService.findAllPostWithDetails(user);
  }
}
