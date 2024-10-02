import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout"; // Import Layout
import dotenv from 'dotenv';
import App from "next/app";
import { Component } from "react";

dotenv.config();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
