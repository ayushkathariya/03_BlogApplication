"use client";

import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcAddImage } from "react-icons/fc";
import { useRouter } from "next/navigation";

const CreateArticle: FC = () => {
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<any>("");
  const router = useRouter();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          caption,
          message,
          image,
        }),
      });
      router.refresh();
    } catch (error) {
      console.log("error");
    } finally {
      setCaption("");
      setMessage("");
      setImage("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit}
          className="mt-4 ml-1 lg:mt-7 sm:ml-5 md:ml-6 lg:ml-6 xl:ml-12 2xl:ml-20"
        >
          <DialogHeader>
            <DialogTitle>Create your own Article</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click ok when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Caption
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Message
              </Label>
              <Input
                id="username"
                className="col-span-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="image" className="text-right">
                <FcAddImage className="ml-4 text-5xl cursor-pointer" />
              </Label>
              <Input
                id="image"
                className="hidden col-span-3"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {image && (
              <img
                src={image}
                alt="img"
                className="w-[80%] h-52 rounded mx-auto"
              />
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleSubmit}>
              ok
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateArticle;
