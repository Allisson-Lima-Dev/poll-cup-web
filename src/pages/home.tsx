import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAuthContext } from "~/context/AuthContext";
import { useEffect } from "react";
import { api } from "~/services/api";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Logado 🚀🚀🥳 {session?.user?.name}</h4>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
