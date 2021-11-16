import { gql } from "@apollo/client";

export const GET_All_GROUPE_BY_USER = gql`
  query GetGroupeByMultipleUsers($data: ArgsGetGroupePerUser!) {
    getGroupeByMultipleUsers(data: $data) {
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
          IsOnline
          connectedAt
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
          IsOnline
          connectedAt
        }
      }
    }
  }
`;

export const ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      email
      name
      imageUrl
      IsOnline
      connectedAt
    }
  }
`;
