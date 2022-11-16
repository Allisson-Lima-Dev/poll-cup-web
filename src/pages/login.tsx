import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAuthContext } from "~/context/AuthContext";
import { FormEventHandler, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const { signInWithGoogle } = useAuthContext();
  async function handleLogin() {
    signIn("google");
  }
  console.log(session, status);

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      callbackUrl: "https://poll-cup-web.vercel.app/home",
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="sign-in-form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
              type="email"
              placeholder="john@email.com"
            />
            <input
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="password"
              placeholder="********"
            />
            <input type="submit" value="Login" />
          </form>
        </div>
        <h4>Signed in as {session?.user?.name}</h4>
        <button onClick={signInWithGoogle}>Sign in</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
