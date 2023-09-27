import React from "react";

type Props = {
  icon: any;
};

export default async function LikePost({ icon }: Props) {
  return <span className="text-xl cursor-pointer">{icon}</span>;
}
