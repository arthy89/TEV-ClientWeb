import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const {getClient} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://192.168.1.48:4000/graphql",
      // uri: "https://tev-server.vercel.app/graphql",
      // uri: process.env.SERVER_URI,
    })
  });
})