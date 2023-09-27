"use client";

import { FC } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton: FC = () => {
  return (
    <span className="flex items-center" onClick={() => signOut()}>
      <LogOut className="w-4 h-4 mr-2" />
      <span>Log out</span>
    </span>
  );
};

export default LogoutButton;
