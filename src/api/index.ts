import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import socketClient from "socket.io-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

export const wsClient = new SubscriptionClient("ws://localhost:4000/graphql", {
  reconnect: true,
  connectionParams: {
    authorization: localStorage.getItem("token"),
  },
});

const wsLink = new WebSocketLink(wsClient);
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions,
});

export const IMAGE_URL = "http://localhost:4000/images/";
export const socket = socketClient("http://localhost:4000", {
  query: { token: localStorage.getItem("token") || ("nothing" as any) },
});
