"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Signin: FC = () => {
  return (
    <Button onClick={() => signIn("google")}>
      <FcGoogle className="w-4 h-4 mr-2" /> Login
    </Button>
  );
};

export default Signin;
