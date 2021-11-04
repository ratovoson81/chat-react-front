import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation SignupUser($data: UserCreateInput!) {
    signupUser(data: $data) {
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($data: UserLoginInput!) {
    loginUser(data: $data) {
      token
      theUser {
        email
        name
        id
      }
    }
  }
`;

export const ISLOGGED = gql`
  mutation IsLogged {
    isLogged {
      id
      email
      name
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
      id
      content
      from {
        email
        id
        name
      }
      to {
        id
        name
        email
      }
      date
    }
  }
`;
