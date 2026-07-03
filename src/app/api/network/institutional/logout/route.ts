import { destroyInstitutionalSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api-response";

export async function POST() {
  await destroyInstitutionalSession();
  return jsonOk({ loggedOut: true });
}