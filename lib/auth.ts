import User from "@/models/User";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/lib/connectDb";

// Database configuraion
connectDb();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user._id = sessionUser._id.toString();
      return session;
    },
    async signIn({ user }) {
      const isUserExists = await User.findOne({
        email: user?.email,
      });
      if (isUserExists) {
        return true;
      }
      // If user not exists
      await User.create({
        name: user?.name,
        email: user?.email,
        avatar: user?.image,
      });
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export const getAuthSession = () => getServerSession(authOptions);
