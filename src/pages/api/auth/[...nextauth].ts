import axios from "axios";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { parseCookies, setCookie } from "nookies";
import { api } from "~/services/api";

interface IUserProps {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { "next-auth.session-token": authToken } = parseCookies({ req });
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { data } = await api.post("/signIn", {
          email,
          password,
        });

        setCookie(undefined, "@PollCupAccess_token", data?.token, {
          maxAge: 1 * 24 * 60 * 60, // 1 day
          path: "/",
        });

        const { data: dataUser } = await api.get("/me", {
          headers: { Authorization: `Bearer ${data?.token || "oi"}` },
        });

        const { avatarUrl, email: emailUser, sub, name } = dataUser?.user;

        console.log(dataUser);
        // perform you login logic
        // find out user from db
        if (!dataUser) {
          throw new Error("invalid credentials");
        }

        if (dataUser) {
          return {
            id: sub || "123",
            name: name || "John Doe",
            email: emailUser || "john@gmail.com",
            image: avatarUrl || "",
            access_token: authToken || data?.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && user) {
        account.access_token = user.access_token || account.access_token;
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user.id = token.id || user.id;
      session.user.image = token.picture || user.image || "";
      session.accessToken = token.accessToken || user.access_token;
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

  secret: process?.env?.SECRET as string,
};

export default NextAuth(authOptions);
