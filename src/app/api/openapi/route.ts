import { NextResponse } from "next/server";
import { openapiSpec } from "../../lib/openapi";

export const dynamic = "force-dynamic"; // evita cache chato durante dev

export function GET() {
  return NextResponse.json(openapiSpec);
}