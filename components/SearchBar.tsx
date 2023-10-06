"use client";

import { FC, FormEvent, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { Button } from "./ui/button";

const SearchBar: FC = () => {
  const [article, setArticle] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      alert("This feature is not available right now. It is in beta.");
    } catch (error) {
      console.log(error);
    } finally {
      setArticle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="flex items-center w-full gap-2 px-2 py-1 border rounded-lg">
        <label htmlFor="article">
          <FcSearch className="text-2xl cursor-pointer" />
        </label>
        <input
          type="text"
          id="article"
          placeholder="Search article"
          className="bg-inherit focus:outline-none md:w-96"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </span>
    </form>
  );
};

export default SearchBar;
