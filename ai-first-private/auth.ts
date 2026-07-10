import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { isAllowedEmail } from "@/lib/access";

type GoogleProfile = {
  email?: string;
  email_verified?: boolean;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 45 * 60
  },
  jwt: {
    maxAge: 45 * 60
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return false;
      }

      const googleProfile = profile as GoogleProfile | undefined;
      const email = googleProfile?.email;
      return Boolean(googleProfile?.email_verified && isAllowedEmail(email));
    }
  }
});
