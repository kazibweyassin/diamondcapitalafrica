import { destroyGoldCustomerSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api-response";
export async function POST() { await destroyGoldCustomerSession(); return jsonOk({}); }
