import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();
  console.log({ session });

  return (
    <Box bg="#244582" py="10px" color="#ffffff">
      <Flex
        maxW="1200px"
        mx="auto"
        w={{ base: "95%", md: "95%", lg: "100%", xl: "85%" }}
        px={{ base: "10px", md: "20px" }}
        justify="space-between"
        align="center"
      >
        <Text>Logo</Text>
        <Flex
          w={{ base: "170px", md: "260px" }}
          justify="space-between"
          align="center"
        >
          {[
            {
              title: "Home",
              path: "/",
            },
            {
              title: "Bolões",
              path: "/home",
            },
          ].map((item, key) => (
            <Box key={key} cursor="pointer">
              <Link href={item.path}>{item.title}</Link>
            </Box>
          ))}
          <Flex align="center">
            <Text mr="5px" display={{ base: "none", md: "flex" }}>
              |
            </Text>
            <Text
              fontSize="14px"
              mr="7px"
              display={{ base: "none", md: "flex" }}
            >
              {session?.user.name}
            </Text>
            <Avatar
              name={session?.user.name}
              src={session?.user?.image}
              size="md"
              w="40px"
              h="40px"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
