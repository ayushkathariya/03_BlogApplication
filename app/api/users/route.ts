import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import User from "@/models/User";

export const GET = async (request: NextRequest) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const user = await User.findById(session?.user?._id).populate({
      path: "articles",
      populate: {
        path: "comments",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
