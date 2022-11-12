import NextAuth, { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const auth = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process?.env?.GOOGLE_CLIENT_SECRET,
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "NextAuthCredentials",
    //   credentials: {},
    //   async authorize(credentials): Promise<any> {
    //     console.log("Oi", credentials);

    //     return credentials;
    //   },
    // }),
  ],
  callbacks: {
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

  secret: "ksfhslkdlfksdf~çlsd",
});
