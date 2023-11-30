export const formatWalletAddress = (wallet: string = "") => {
  return `${wallet.substr(0, 6)}..${wallet.substr(wallet.length - 6)}`;
};

export const parseJwt = (token: string | null) => {
  if (!token) return;

  return JSON.parse(atob(token.split(".")[1]))
}