import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import Article from "@/models/Article";

export const POST = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (article.likes.includes(session?.user?._id)) {
      const index = article.likes.indexOf(session?.user?._id);
      article?.likes.splice(index, 1);
      await article.save();
      return NextResponse.json({ message: "Unliked successfully" });
    } else {
      article.likes.push(session?.user?._id);
      await article.save();
      return NextResponse.json({ message: "Liked successfully" });
    }
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
