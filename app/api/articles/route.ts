import { getAuthSession } from "@/lib/auth";
import Article from "@/models/Article";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import cloudinaryConfig from "@/lib/cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";
import articleResponse from "@/lib/articleResponse";

// Cloudinary config
cloudinaryConfig();

export const GET = async () => {
  try {
    const session = await getAuthSession();
    const user = await User.findById(session?.user?._id);

    const articles = await Article.find().populate("user_id");

    const newArticles = articles
      .map((item) => articleResponse(item, user?._id || -1))
      .reverse();
    return NextResponse.json({ articles: newArticles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { caption, message, image } = await request.json();
    if (!caption || !message || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(session?.user?._id);
    if (!user) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const cloudImage = await cloudinary.uploader.upload(image, {
      folder: "Articles",
    });

    const article = await Article.create({
      caption,
      message,
      image: cloudImage.url,
      user_id: session?.user?._id,
    });

    user.articles.push(article._id);
    await user.save();

    return NextResponse.json({ article }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
