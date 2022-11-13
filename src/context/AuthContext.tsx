/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signIn } from "next-auth/react";
import Router from "next/router";
import { setCookie } from "nookies";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { api } from "../services/api";

type Component = {
  children: ReactNode;
};

interface UserProps {
  name: string;
  avatarUrl: string;
}
export interface AuthContextDataProps {
  user: UserProps | null;
  isUseLoading: boolean;
  signInCredentials: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: Component) {
  const [isUseLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const { data: session, status } = useSession();

  async function SignInUser() {
    console.log("entrou");

    setIsUserLoading(true);
    try {
      const { data } = await api.post("/users", {
        access_token: session?.accessToken,
      });

      setCookie(undefined, "@PollCupAccess_token", data.token, {
        maxAge: 1 * 24 * 60 * 60, // 1 day
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const { data: dataUser } = await api.get("/me");

      setUser(dataUser.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle() {
    signIn("google");
  }

  async function signInCredentials() {
    setIsUserLoading(true);
    try {
      //   await promptAsync();
    } catch (error) {
      console.log({ error });
      throw error;
    } finally {
      setIsUserLoading(true);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      SignInUser();
      return;
    }
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        signInCredentials,
        signInWithGoogle,
        isUseLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
