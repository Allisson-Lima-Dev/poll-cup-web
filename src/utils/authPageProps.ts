import { getSession } from "next-auth/react";
import { parseCookies, setCookie } from "nookies";
import { unstable_getServerSession } from "next-auth/next";

import { getAPIClient } from "~/services/axios";
import { redirectTo } from "./redirectTo";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export async function authPageProps({ Component, ctx }: any) {
  let pageProps = {};
  const api = getAPIClient();
  const FREE_ROUTES = ["/login", "/teste"];
  const {
    "@PollCupAccess_token": token,
    "next-auth.session-token": authToken,
  } = parseCookies(ctx);

  const session = await getSession(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (FREE_ROUTES.includes(ctx.pathname)) return { pageProps };

  if (!session?.accessToken) {
    redirectTo("/login", { res: ctx.res, status: 301 });
    return {};
  }
  if (session.accessToken) {
    return { pageProps };
  }

  redirectTo("/login", { res: ctx.res, status: 301 });
  return {};
}
