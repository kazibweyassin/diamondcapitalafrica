import { goldSavings } from "@/data/gold-savings";

const DEFAULT_USDT_WALLET = "TBStEPmkEp5LhU12artDsQNSJFRjxtGeCe";
const DEFAULT_USDT_NETWORK = "TRC20";

export function getUsdtConfig() {
  const wallet = (
    process.env.GOLD_SAVINGS_USDT_WALLET ?? DEFAULT_USDT_WALLET
  ).trim();
  const network = (process.env.GOLD_SAVINGS_USDT_NETWORK ?? DEFAULT_USDT_NETWORK)
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