import { company } from "@/data/content";
import { institutionalMembership } from "@/data/network";
import { getUsdtNetworkGuide } from "@/lib/usdt-network";

const DEFAULT_INSTITUTIONAL_USDT_WALLET =
  "TS9mVMnyBufFb1wN2AyixDVsSAE6EF7rwT";
const DEFAULT_INSTITUTIONAL_USDT_NETWORK = "TRC20";

export function getInstitutionalUsdtConfig() {
  const wallet = (
    process.env.INSTITUTIONAL_USDT_WALLET ?? DEFAULT_INSTITUTIONAL_USDT_WALLET
  ).trim();
  const network = (
    process.env.INSTITUTIONAL_USDT_NETWORK ?? DEFAULT_INSTITUTIONAL_USDT_NETWORK
  )
    .trim()
    .toUpperCase();

  return {
    wallet,
    network,
    networkGuide: getUsdtNetworkGuide(network),
    configured: Boolean(wallet),
  };
}

export function getInstitutionalMembershipPayment() {
  const usdt = getInstitutionalUsdtConfig();

  return {
    tier: institutionalMembership,
    usdt: {
      wallet: usdt.wallet,
      network: usdt.network,
      networkGuide: usdt.networkGuide,
      amount: institutionalMembership.feeUsd,
    },
    wire: {
      email: company.investorsEmail,
      contactName: company.contactName,
      phone: company.phone,
    },
  };
}