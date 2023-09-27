import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "Hello from server" });
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
