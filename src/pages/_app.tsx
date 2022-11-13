import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "~/context/AuthContext";
import { authPageProps } from "~/utils/authPageProps";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <NextNprogress
          color="#21C6DE"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow
        />
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = authPageProps;

export default MyApp;
