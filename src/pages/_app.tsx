import NextNprogress from "nextjs-progressbar";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "~/context/AuthContext";
import { authPageProps } from "~/utils/authPageProps";
import { theme } from "~/styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider refetchOnWindowFocus={true} session={session}>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <NextNprogress
            color="#21C6DE"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = authPageProps;

export default MyApp;
