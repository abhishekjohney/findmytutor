import type { NextAuthConfig } from "next-auth";

// Notice this is only the config object, not the full NextAuth execution.
// This does NOT include the Prisma adapter or OAuth providers, so it can run safely on the Edge (Middleware).
export default {
  providers: [],
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
