import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    email
    name
    imageUrl
    isOnline
    connectedAt
  }
`;

export const GROUPE_FIELDS = gql`
  ${USER_FIELDS}
  fragment GroupeFields on Groupe {
    id
    name
    messages {
      id
      content
      date
      view
      viewAt
      author {
        ...UserFields
      }
    }
    users {
      userId
      groupeId
      user {
        ...UserFields
      }
    }
  }
`;

export const MESSAGE_FIELDS = gql`
  ${USER_FIELDS}
  fragment MessageFields on Message {
    id
    content
    author {
      ...UserFields
    }
    date
    view
    viewAt
  }
`;
