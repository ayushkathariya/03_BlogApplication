"use client";

import { FC } from "react";
import AvatarCard from "./AvatarCard";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

type ArticleProps = {
  id: string;
  caption: string;
  message: string;
  image: string;
  user: any;
  likes: number;
  isLiked: boolean;
  timeAgo: any;
};

const Article: FC<ArticleProps> = ({
  id,
  caption,
  message,
  image,
  user,
  likes,
  isLiked,
  timeAgo,
}) => {
  const { status } = useSession();
  const router = useRouter();

  const handleLikeEvent = async () => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${id}/like`, {
      method: "POST",
    });
    router.refresh();
  };

  return (
    <div className="border w-[22rem] sm:w-[16rem] md:w-[20rem] lg:w-[18rem] xl:w-[22rem] rounded-lg py-2">
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-3 px-2">
          <AvatarCard image={user.avatar} />
          <h2 className="font-bold">{user.name}</h2>
        </span>
        <span>
          <p>{timeAgo}</p>
        </span>
      </span>
      <div>
        <Image src={image} alt="photo" width={500} height={500} />
      </div>
      <div className="px-2 cursor-pointer">
        <h2 className="mt-2 text-lg font-bold">{caption}</h2>
        <p className="font-medium">{message}</p>
      </div>
      <div className="flex px-2 mt-2 gap-7 footer">
        <span className="flex items-center gap-2">
          {isLiked ? (
            <FcLike
              onClick={handleLikeEvent}
              className="text-xl cursor-pointer"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeEvent}
              className="text-xl cursor-pointer"
            />
          )}
          <p>{likes}</p>
        </span>
      </div>
    </div>
  );
};

export default Article;
