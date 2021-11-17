import { gql } from "@apollo/client";
import { GROUPE_FIELDS, MESSAGE_FIELDS, USER_FIELDS } from "./fragement";

export const REGISTER = gql`
  mutation SignupUser($data: UserCreateInput!) {
    signupUser(data: $data) {
      name
      email
    }
  }
`;

export const LOGIN = gql`
  ${USER_FIELDS}
  mutation LoginUser($data: UserLoginInput!) {
    loginUser(data: $data) {
      token
      theUser {
        ...UserFields
      }
    }
  }
`;

export const ISLOGGED = gql`
  ${USER_FIELDS}
  mutation IsLogged {
    isLogged {
      ...UserFields
    }
  }
`;

export const SEND_MESSAGE = gql`
  ${MESSAGE_FIELDS}
  mutation SendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
      ...MessageFields
    }
  }
`;

export const CREATE_GROUPE = gql`
  ${GROUPE_FIELDS}
  mutation CreateGroupe($data: ArgsGroupe!) {
    createGroupe(data: $data) {
      ...GroupeFields
    }
  }
`;
