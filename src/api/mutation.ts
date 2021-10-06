import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation SignupUser($data: UserCreateInput!) {
    signupUser(data: $data) {
      name
      email
    }
  }
`;
