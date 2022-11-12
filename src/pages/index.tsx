import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  async function handleLogin() {
    signIn("google");
  }
  console.log(session, status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Signed in as {session?.user?.name}</h4>
        <button onClick={handleLogin}>Sign out</button>
      </div>
    </div>
  );
}
