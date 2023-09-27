import React, { FC } from "react";
import { cookies } from "next/headers";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import Article from "@/components/Article";
import Pagination from "@/components/Pagination";
import { SESSION_TOKEN_NAME } from "@/lib/constants";
import Footer from "@/components/Footer";
import CreateArticle from "@/components/CreateArticle";
import { getAuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Home: FC = async () => {
  const router = useRouter();

  const session = await getAuthSession();
  if (!session) {
    router.push("/auth/signin");
  }

  const fetchData = async () => {
    const SESSION_TOKEN_VALUE = cookies().get(SESSION_TOKEN_NAME)?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
      {
        headers: { cookie: `${SESSION_TOKEN_NAME}=${SESSION_TOKEN_VALUE}` },
        cache: "no-cache",
      }
    );
    return res.json();
  };

  const articles = await fetchData();

  return (
    <div>
      <Dashboard />
      <span className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
        <h3 className="text-xl font-bold">Popular Tags :</h3>
        <Button variant="outline">Coding</Button>
        <Button variant="outline">Gaming</Button>
        <Button variant="outline">Sports</Button>
        <Button variant="outline">Food</Button>
        <Button variant="outline">Travel</Button>
        <Button variant="outline">Blog</Button>
        <Button variant="outline">Technology</Button>
        <Button variant="outline">Entertainment</Button>
      </span>
      {/* Crate Article */}
      <span>
        <CreateArticle />
      </span>
      {/* Article */}
      <span className="flex flex-wrap gap-6 mt-5 justify-evenly lg:mt-10">
        {articles?.articles?.map((article: any) => (
          <Article
            key={article?._id}
            id={article?._id}
            caption={article?.caption}
            message={article?.message}
            image={article?.image}
            user={article.user}
            likes={article.likes}
            isLiked={article.isLiked}
            timeAgo={article?.timeAgo}
          />
        ))}
      </span>
      {/* Pagination */}
      <div>
        <Pagination />
      </div>
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
