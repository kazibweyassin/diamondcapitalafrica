export type UsdtNetworkCode = "TRC20" | "BEP20" | "ERC20";

const networkGuides: Record<
  UsdtNetworkCode,
  {
    label: string;
    binanceLabel: string;
    addressHint: string;
    binanceSteps: string[];
  }
> = {
  TRC20: {
    label: "TRON (TRC20)",
    binanceLabel: "TRON",
    addressHint: "Wallet address starts with T",
    binanceSteps: [
      "Binance app → Wallet → Withdraw",
      "Coin: USDT",
      'Network: select TRON (may appear as "TRON", "TRX", or "TRC20" — not BSC or Ethereum)',
      "Paste the wallet address below and send the exact USDT amount",
      "Add your application reference in the memo/note field if available",
    ],
  },
  BEP20: {
    label: "BNB Smart Chain (BEP20)",
    binanceLabel: "BSC",
    addressHint: "Wallet address starts with 0x",
    binanceSteps: [
      "Binance app → Wallet → Withdraw",
      "Coin: USDT",
      'Network: select BNB Smart Chain (BEP20) or "BSC"',
      "Paste the wallet address below and send the exact USDT amount",
      "Add your application reference in the memo/note field if available",
    ],
  },
  ERC20: {
    label: "Ethereum (ERC20)",
    binanceLabel: "Ethereum",
    addressHint: "Wallet address starts with 0x",
    binanceSteps: [
      "Binance app → Wallet → Withdraw",
      "Coin: USDT",
      "Network: select Ethereum (ERC20)",
      "Paste the wallet address below and send the exact USDT amount",
    ],
  },
};

export function normalizeUsdtNetwork(network: string): UsdtNetworkCode {
  const value = network.trim().toUpperCase();
  if (value === "BEP20" || value === "BSC") return "BEP20";
  if (value === "ERC20" || value === "ETH") return "ERC20";
  return "TRC20";
}

export function getUsdtNetworkGuide(network: string) {
  const code = normalizeUsdtNetwork(network);
  return { code, ...networkGuides[code] };
}