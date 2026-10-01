import { jsonOk } from "@/lib/api-response";
import { destroySupplierSession } from "@/lib/auth";

export async function POST() {
  await destroySupplierSession();
  return jsonOk({ ok: true });
}
