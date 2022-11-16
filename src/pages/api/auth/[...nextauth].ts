import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { parseCookies, setCookie } from "nookies";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { "next-auth.session-token": authToken } = parseCookies({ req });
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (email !== "john@gmail.com" || password !== "1234") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          access_token: authToken,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && user) {
        account.access_token = user.access_token;
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 1 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },

  secret: "ksfhslkdlfksdf~çlsd",
};

export default NextAuth(authOptions);
