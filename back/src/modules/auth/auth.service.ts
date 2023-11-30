import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

const Web3 = require('web3');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  private web3: typeof Web3;

  private prv = 'jfioez'; // move to env

  constructor(private userService: UserService) {
    //                    -> move to env
    this.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  }

  async getNonce(wallet: string) {
    if (!wallet) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const nonce = new Date().getTime();

    const tmpToken = jwt.sign({ nonce, wallet }, this.prv, {
      expiresIn: '60s',
    });

    return {
      tmpToken,
      message: this.getMessage(wallet, nonce),
    };
  }

  async verifySignature(token: string, signature: string) {
    const { nonce, wallet } = await jwt.verify(token, this.prv);

    if (!nonce || !wallet) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const foundedAddress = await this.web3.eth.accounts.recover(
      this.getMessage(wallet, nonce),
      signature,
    );

    if (foundedAddress.toLowerCase() != wallet.toLowerCase()) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.userService.findByWallet(foundedAddress);

    if (!user) {
      await this.userService.create(foundedAddress);
    }

    return {
      token: jwt.sign({ wallet: foundedAddress }, this.prv, {
        expiresIn: '1d',
      }),
    };
  }

  getMessage(wallet: string, nonce: number) {
    return `
      Authentication with ${wallet} (${nonce})
    `;
  }
}
