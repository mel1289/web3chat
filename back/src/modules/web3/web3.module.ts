import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';
import { WEB3 } from './constants';
const Web3 = require('web3');

@Module({})
export class Web3Module {
  public static forRoot(provider: string): DynamicModule {
    const web3: typeof Web3 = new Web3(provider);

    const web3Provider: Provider = {
      provide: WEB3,
      useValue: web3,
    };

    return {
      module: Web3Module,
      providers: [web3Provider],
      exports: [web3Provider],
      global: true,
    };
  }
}
