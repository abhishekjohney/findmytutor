import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Notice this is only the config object, not the full NextAuth execution.
// This does NOT include the Prisma adapter, so it can run safely on the Edge (Middleware).
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "PARENT", // Default role
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as any;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
