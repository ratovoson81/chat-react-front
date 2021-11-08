import { client } from "./index";
import { gql } from "@apollo/client";

const GET_All_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      email
      name
      imageUrl
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
        imageUrl
      }
      to {
        id
        name
        email
        imageUrl
      }
    }
  }
`;

export const ALL_MESSAGE_BY_ME = gql`
  query AllUsersMessageByMe($data: IdUser!) {
    allUsersMessageByMe(data: $data) {
      id
      email
      name
      imageUrl
      lastMessage {
        id
        content
        from {
          id
        }
        to {
          id
        }
        date
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
