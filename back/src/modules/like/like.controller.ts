import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/modules/user/user.decorator';
import { User } from 'src/modules/user/user.schema';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async likePost(@CurrentUser() user: User, @Body() { postId }) {
    return await this.likeService.likePost(user, postId);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async unlikePost(@CurrentUser() user: User, @Param('id') postId: string) {
    return await this.likeService.unlikePost(user, postId);
  }
}
