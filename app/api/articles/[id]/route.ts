import Article from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";
import articleResponse from "@/lib/articleResponse";
import { getAuthSession } from "@/lib/auth";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const session = await getAuthSession();
    const article = await Article.findById(id).populate("user_id");
    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const newArticle = articleResponse(article, session?.user?._id);

    return NextResponse.json({ article: newArticle });
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
