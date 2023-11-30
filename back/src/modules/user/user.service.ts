import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(wallet: string): Promise<User> {
    const alreadyUsed = await this.findByWallet(wallet);

    if (alreadyUsed) {
      throw new HttpException('Wallet already used', HttpStatus.CONFLICT);
    }

    let user = new this.userModel();

    user.username = null;
    user.wallet = wallet;

    return user.save();
  }

  async updateUsername(user: User, username: string): Promise<User> {
    const alreadyUsed = await this.findByUsername(username);

    if (alreadyUsed) {
      throw new HttpException('Username already used', HttpStatus.CONFLICT);
    }

    const userUpdated = await this.userModel.findOne({ wallet: user.wallet });

    userUpdated.username = username;

    return userUpdated.save();
  }

  async findByWallet(wallet: string): Promise<User> {
    return this.userModel.findOne({ wallet });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
