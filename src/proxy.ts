import { NextResponse, type NextRequest } from "next/server";

const INVEST_HOST = "invest.diamondcapitalafrica.com";
const BUSINESS_HOST = "business.diamondcapitalafrica.com";

export function proxy(request: NextRequest) {
  const requestHost = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.hostname)
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();

  if (requestHost !== INVEST_HOST && requestHost !== BUSINESS_HOST) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(requestHost === BUSINESS_HOST ? "/business" : "/invest", request.url),
  );
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
