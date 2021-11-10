import { client } from "./index";
import { gql } from "@apollo/client";

export const GET_All_GROUPE_BY_USER = gql`
  query AllGroupeByUser($data: ArgsGetGroupePerUser!) {
    allGroupeByUser(data: $data) {
      id
      name
      messages {
        id
        content
        date
        author {
          id
          name
          email
          imageUrl
        }
      }
      users {
        userId
        groupeId
        user {
          id
          name
          email
          imageUrl
        }
      }
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
    }
  }
`;

const Query = {
  getChat() {
    return client.query({
      fetchPolicy: "network-only",
      query: GET_CHAT,
    });
  },
};

export default Query;
