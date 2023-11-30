import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifySignatureDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/nonce/:wallet')
  async getNonce(@Param('wallet') wallet: string) {
    return this.authService.getNonce(wallet);
  }

  @Post('/verify')
  async verify(@Body() { token, signature }: VerifySignatureDto) {
    return this.authService.verifySignature(token, signature);
  }
}