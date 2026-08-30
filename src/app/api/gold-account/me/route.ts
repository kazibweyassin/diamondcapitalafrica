import { requireGoldCustomer } from "@/lib/auth";
import { getGoldCustomerDashboard } from "@/lib/gold-customer";
import { jsonError, jsonOk } from "@/lib/api-response";
export async function GET() {
  try {
    const session = await requireGoldCustomer();
    const dashboard = await getGoldCustomerDashboard(session.customerId);
    return dashboard ? jsonOk(dashboard) : jsonError("Account not found", 404);
  } catch { return jsonError("Unauthorized", 401); }
}
