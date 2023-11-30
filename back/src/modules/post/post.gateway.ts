import { HttpException, HttpStatus } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({ cors: '*' })
export class PostGateway {
  constructor(
    private postService: PostService,
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

  @SubscribeMessage('findAllPosts')
  async findAllPosts(@MessageBody() input: any, client: Socket) {
    return this.postService.findAll();
  }

  @SubscribeMessage('newPost')
  async newPost(client: Socket) {
    client.broadcast.emit('newPost');
  }
}
