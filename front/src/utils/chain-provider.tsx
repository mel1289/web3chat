import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    display: {
      name: "WalletConnect",
      description: "Scan with WalletConnect to connect",
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://bsc-dataseed2.binance.org/",
      },
      network: "binance",
      chainId: 56,
      qrcode: true,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust", "tokenpocket"],
      },
    },
  },
  /*injected: {
          display: {
            name: "Metamask",
            description: "Connect with the provider in your Browser"
          },
          package: null
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              56: 'https://bsc-dataseed.binance.org/'
            },
            network: 'binance',
            chainId: 56,
          }
        }*/
};
