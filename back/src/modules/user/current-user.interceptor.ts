import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(@Inject() private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    try {
      const user = await this.userService.findByWallet(request.user);
      request.currentUser = user;
    } catch (error) {
      console.log('Error', error);
      throw new BadRequestException();
    }
    return handler.handle();
  }
}