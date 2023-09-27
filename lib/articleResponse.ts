import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const ta = new TimeAgo("en-US");

const articleResponse = (article: any, userId: any) => {
  return {
    _id: article._id,
    caption: article.caption,
    message: article.message,
    image: article.image,
    user: {
      _id: article.user_id._id,
      name: article.user_id.name,
      avatar: article.user_id.avatar,
    },
    likes: article.likes.length,
    isLiked: article.likes.includes(userId),
    timeAgo: ta.format(article.createdAt),
  };
};

export default articleResponse;
