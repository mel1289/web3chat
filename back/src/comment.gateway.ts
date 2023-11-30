import { HttpException, HttpStatus } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { CommentService } from './modules/comment/comment.service';
import { UserService } from './modules/user/user.service';

@WebSocketGateway({ cors: '*' })
export class CommentGateway {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  private server;

  async validateToken(bearer: any) {
    try {
      const decoded = jwt.verify(bearer, 'jfioez');

      const user = await this.userService.findByWallet(decoded.wallet);

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @SubscribeMessage('newComment')
  async newComment(client: Socket, postId: string) {
    this.server.emit('newCOmment', postId);
  }
}
