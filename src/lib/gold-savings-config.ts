import { goldSavings } from "@/data/gold-savings";

export function getUsdtConfig() {
  const wallet = process.env.GOLD_SAVINGS_USDT_WALLET?.trim();
  const network = (process.env.GOLD_SAVINGS_USDT_NETWORK ?? "TRC20")
    .trim()
    .toUpperCase();

  return { wallet, network, configured: Boolean(wallet) };
}

export function getPriceLockUntil(from = new Date()) {
  const until = new Date(from);
  until.setHours(until.getHours() + goldSavings.priceLockHours);
  return until;
}

export function getTxExplorerUrl(network: string, txHash: string) {
  const hash = txHash.trim();
  if (network === "ERC20") {
    return `https://etherscan.io/tx/${hash}`;
  }
  return `https://tronscan.org/#/transaction/${hash}`;
}