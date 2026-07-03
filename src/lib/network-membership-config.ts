import { company } from "@/data/content";
import { institutionalMembership } from "@/data/network";
import { getUsdtConfig } from "@/lib/gold-savings-config";

export function getInstitutionalMembershipPayment() {
  const usdt = getUsdtConfig();

  return {
    tier: institutionalMembership,
    usdt: {
      wallet: usdt.wallet,
      network: usdt.network,
      amount: institutionalMembership.feeUsd,
    },
    wire: {
      email: company.investorsEmail,
      contactName: company.contactName,
      phone: company.phone,
    },
  };
}