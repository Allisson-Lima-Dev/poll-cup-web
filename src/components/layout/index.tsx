import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";

interface layoutProps {
  children: ReactNode;
}

export function Layout({ children }: layoutProps) {
  return (
    <Box w="100%" bg="#F0F0F3" minH="100vh">
      <Header />
      <Box
        pb="100px"
        h="full"
        maxW="1200px"
        mx="auto"
        w={{ base: "95%", md: "95%", lg: "100%", xl: "85%" }}
        px={{ base: "10px", md: "20px" }}
      >
        {children}
      </Box>
    </Box>
  );
}
