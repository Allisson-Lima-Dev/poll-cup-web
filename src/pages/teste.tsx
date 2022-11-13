import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAuthContext } from "~/context/AuthContext";

export default function Home() {
  const { data: session, status } = useSession();
  const { signInWithGoogle } = useAuthContext();
  async function handleLogin() {
    signIn("google");
  }
  console.log(session, status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Logado 🚀🚀🥳 TESTE</h4>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
