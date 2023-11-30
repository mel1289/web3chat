import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    request.user = await this.validateToken(request);

    return true;
  }

  async validateToken(request: any) {
    const bearer = request.headers.authorization;

    if (!bearer || bearer.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = bearer.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'jfioez'); // env private key

      const user = await this.userService.findByWallet(decoded.wallet);

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
