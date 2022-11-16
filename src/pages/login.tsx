import {
  Flex,
  SimpleGrid,
  Image,
  Text,
  Box,
  useToast,
  Button,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAuthContext } from "~/context/AuthContext";
import { FormEventHandler, useState } from "react";
import { Input } from "~/components/input";

interface ISignInRequestData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email Obrigatório"),
  password: yup.string().required("Senha Obrigatória"),
});

export default function Login() {
  const { data: session, status } = useSession();
  const { signInWithGoogle } = useAuthContext();

  const { register, handleSubmit, formState } = useForm<ISignInRequestData>({
    resolver: yupResolver(signInFormSchema),
  });
  console.log(session, status);

  const toast = useToast();

  async function handleSignIn(data: ISignInRequestData) {
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        // callbackUrl: "http://localhost:3000/home",
        callbackUrl: "https://poll-cup-web.vercel.app/home",
        email,
        password,
        redirect: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Credencias incorretas",
        status: "error",
        variant: "solid",
        isClosable: true,
      });
    }
  }

  return (
    <Box
      pt="60px"
      w="30%"
      mx="auto"
      as="form"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Box pb="60px">
        <Text
          color="#00102A"
          fontSize="18px"
          fontWeight="600"
          lineHeight="22px"
        >
          ACESSAR MINHA CONTA
        </Text>
      </Box>
      <Input
        label="Email"
        labelColor="#7F8B9F"
        size="lg"
        bg="transparent"
        fontSize="18px"
        height="56px"
        border="0px"
        borderBottom="1px solid #7F8B9F"
        borderRadius={0}
        placeholder="usuário@gmail.com"
        _focus={{
          borderBottom: "1px solid #2E4EFF",
        }}
        {...register("email")}
        // error={formState?.errors?.username}
      />
      <Box my="10px">
        <Input
          label="Senha"
          labelColor="#7F8B9F"
          size="lg"
          bg="transparent"
          fontSize="18px"
          height="56px"
          border="0px"
          borderBottom="1px solid #7F8B9F"
          borderRadius={0}
          placeholder="*********"
          type="password"
          iconColor="#21C6DE"
          _focus={{
            borderBottom: "1px solid #2E4EFF",
          }}
          {...register("password")}
          error={formState?.errors?.password}
        />
      </Box>
      <Box pt="5px">
        <Text
          color="#7F8B9F"
          fontSize="14px"
          fontWeight="400"
          lineHeight="17px"
          textAlign="right"
        >
          <Link color="#2E4EFF">Esqueci minha senha.</Link>
        </Text>
      </Box>

      <Box mt="18px">
        <Button
          // ref={ref}
          // isLoading={loading}
          bg="#CBD3E0"
          border="0"
          color="#070A0E"
          w="100%"
          type="submit"
          borderRadius="40px"
          _hover={{ background: "#2E4EFF", color: "#FFF" }}
        >
          ENTRAR
        </Button>
        <Box mt="18px"></Box>
        <Button
          bg="#FFF"
          border="1px"
          borderColor="#2E4EFF"
          color="#2E4EFF"
          w="100%"
          borderRadius="40px"
          onClick={signInWithGoogle}
        >
          Entrar com google
        </Button>
      </Box>
    </Box>
  );
}
