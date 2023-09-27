"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Signin = () => {
  const { status } = useSession();

  if (status === "authenticated") redirect("/");

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <span className="flex flex-col items-center gap-5 p-5 px-5 pt-20 pb-10 border rounded-3xl">
        <p className="text-2xl sm:text-3xl font-bold">Continue with Google</p>
        <Button
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/",
            })
          }
          className="w-[90%] mt-3"
        >
          <FcGoogle className="w-6 h-6 mr-5" />{" "}
          <span className="text-base">Google</span>
        </Button>
        <span className="flex flex-col items-center mt-2 text-xs sm:text-sm">
          <p>By continuing, you agree our Terms of Service and </p>
          <p>confirm that you have read our Privacy Policy.</p>
        </span>
      </span>
    </div>
  );
};

export default Signin;
