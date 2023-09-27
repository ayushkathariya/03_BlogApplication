import React from "react";
import { Poppins } from "next/font/google";
import { FcCollaboration } from "react-icons/fc";
import Signin from "./Signin";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import Avatar from "./Avatar";
import { ModeToggle } from "@/components/ModeToggle";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="fixed top-0 z-10 py-2 bg-inherit left-4 sm:left-6 md:left-10 lg:left-14 xl:left-20 right-4 sm:right-6 md:right-10 lg:right-14 xl:right-20">
      <span className="flex items-center justify-between">
        <Link href="/">
          <FcCollaboration className="text-4xl" />
        </Link>
        <span>
          <span className="flex items-center gap-2">
            <ModeToggle />
            {session ? (
              <span className="cursor-pointer">
                <Avatar image={session?.user?.image as string} />
              </span>
            ) : (
              <Signin />
            )}
          </span>
        </span>
      </span>
    </nav>
  );
};

export default Navbar;
