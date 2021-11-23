import { GROUPE_FIELDS, USER_FIELDS } from "./fragement";
import { gql } from "@apollo/client";

export const GET_All_GROUPE_BY_USER = gql`
  ${GROUPE_FIELDS}
  query GetGroupeByMultipleUsers($data: ArgsGetGroupePerUser!) {
    getGroupeByMultipleUsers(data: $data) {
      ...GroupeFields
    }
  }
`;

export const ALL_USERS = gql`
  ${USER_FIELDS}
  query AllUsers {
    allUsers {
      ...UserFields
    }
  }
`;

export const GET_GROUPE_BY_ID = gql`
  ${GROUPE_FIELDS}
  query GetOneGroupeById($data: ArgsGetGroupeById!) {
    getOneGroupeById(data: $data) {
      ...GroupeFields
    }
  }
`;
