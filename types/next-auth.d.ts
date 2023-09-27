import type { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      _id: string;
    };
  }
}
