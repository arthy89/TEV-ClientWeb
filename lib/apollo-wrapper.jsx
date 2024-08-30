"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import dotenv from "dotenv";

dotenv.config();
const server_url = process.env.NEXT_PUBLIC_SERVER_URI;
// console.log("gaaaaaaa", server_url);

function makeClient() {
  const httpLink = new HttpLink({
    // uri: "http://192.168.1.48:4000/graphql",
    // uri: "https://tev-server.vercel.app/graphql",
    // uri: process.env.SERVER_URI,
    uri: server_url,
  });


  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
