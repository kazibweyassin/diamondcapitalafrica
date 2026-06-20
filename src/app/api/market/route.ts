import { fetchMarketPricesServer } from "@/lib/market-server";
import { jsonOk, jsonError } from "@/lib/api-response";

export async function GET() {
  try {
    const data = await fetchMarketPricesServer();
    return jsonOk(data);
  } catch {
    return jsonError("Failed to fetch market prices", 500);
  }
}