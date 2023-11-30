import { HttpException, HttpStatus } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { LikeService } from './like.service';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({ cors: '*' })
export class LikeGateway {
  constructor(
    private likeService: LikeService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  private server;

  handleConnection(client: Socket) {
    // console.log('Client connected: ', client.handshake.query.token);
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected: ', client);
  }

  async validateToken(bearer: any) {
    try {
      const decoded = jwt.verify(bearer, 'jfioez'); // env private key

      const user = await this.userService.findByWallet(decoded.wallet);

      return user;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @SubscribeMessage('like')
  async likePost(client: Socket, postId: string) {
    const user = await this.validateToken(client.handshake.query.token);

    this.likeService.likePost(user, postId);

    this.server.emit('like', postId);
  }

  @SubscribeMessage('unlike')
  async unlikePost(client: Socket, postId: string) {
    const user = await this.validateToken(client.handshake.query.token);

    this.likeService.unlikePost(user, postId);

    this.server.emit('unlike', postId);
  }
}
