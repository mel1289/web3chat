import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from './user.decorator';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Post('/username')
  @UseGuards(AuthGuard)
  async updateUsername(
    @CurrentUser() user: User,
    @Body() { username }: any,
  ): Promise<User> {
    return this.userService.updateUsername(user, username);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
