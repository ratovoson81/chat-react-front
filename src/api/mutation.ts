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
        imageUrl
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
      imageUrl
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
      id
      content
      author {
        id
        email
        name
        imageUrl
      }
      date
    }
  }
`;

export const CREATE_GROUPE = gql`
  mutation CreateGroupe($data: ArgsGroupe!) {
    createGroupe(data: $data) {
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
