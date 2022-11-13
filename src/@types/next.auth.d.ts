import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string | unknown;
      address: string;
      name: string;
    };
    accessToken: string | unknown;
  }

  interface User {
    access_token: string | unknown;
  }

  interface Account {
    access_token: string | unknown;
  }

  interface token {
    expiresIn: string | unknown;
    id: string;
  }
}
