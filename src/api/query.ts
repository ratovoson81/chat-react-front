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

const UserQuery = {
  getAllUsers() {
    return client.query({
      fetchPolicy: "network-only",
      query: GET_All_USERS,
    });
  },
};

export default UserQuery;
