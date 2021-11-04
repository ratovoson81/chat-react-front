import { client } from "./index";
import { gql } from "@apollo/client";

const GET_All_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      email
      name
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($data: ArgsMessageChat!) {
    getChat(data: $data) {
      id
      content
      date
      from {
        id
        name
        email
      }
      to {
        id
        name
        email
      }
    }
  }
`;

const Query = {
  getAllUsers() {
    return client.query({
      fetchPolicy: "network-only",
      query: GET_All_USERS,
    });
  },
  getChat() {
    return client.query({
      fetchPolicy: "network-only",
      query: GET_CHAT,
    });
  },
};

export default Query;
