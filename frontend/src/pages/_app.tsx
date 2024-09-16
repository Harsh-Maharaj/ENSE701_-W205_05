import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
//import PopulatedNavBar from "../components/PopulatedNavBar";
import NavBar from "@/components/nav/NavBar";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NavBar/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
