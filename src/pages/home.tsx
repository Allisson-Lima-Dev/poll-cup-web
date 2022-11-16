import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAuthContext } from "~/context/AuthContext";
import { useEffect } from "react";
import { api } from "~/services/api";
import { Box, Flex, Text } from "@chakra-ui/react";
import Router from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const { signInWithGoogle } = useAuthContext();
  async function handleLogin() {
    signIn("google");
  }
  console.log(session, status);

  useEffect(() => {
    async function getPolls() {
      const { data } = await api.get("/polls/count");
      console.log({ data });
    }
    getPolls();
  }, []);
  return (
    <Box h="full" w="full">
      <Text>Home</Text>
      <h4>Logado 🚀🚀🥳 {session?.user?.name}</h4>
      <button
        onClick={() => {
          signOut({
            callbackUrl: "http://localhost:3000/login",
            redirect: true,
          });
        }}
      >
        Sign out
      </button>
    </Box>
  );
}
