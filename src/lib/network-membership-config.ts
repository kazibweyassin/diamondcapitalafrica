import { company } from "@/data/content";
import { institutionalMembership } from "@/data/network";
import { getUsdtConfig } from "@/lib/gold-savings-config";
import { getUsdtNetworkGuide } from "@/lib/usdt-network";

export function getInstitutionalUsdtConfig() {
  const fallback = getUsdtConfig();
  const wallet = (
    process.env.INSTITUTIONAL_USDT_WALLET ?? fallback.wallet
  ).trim();
  const network = (
    process.env.INSTITUTIONAL_USDT_NETWORK ?? fallback.network
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