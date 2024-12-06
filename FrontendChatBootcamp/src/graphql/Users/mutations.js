import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!,$isLoggedIn: Boolean!) {
    createUser(firstName: $firstName, lastName: $lastName,isLoggedIn:$isLoggedIn) {
      id
      firstName
      lastName
      isLoggedIn
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation ($userId: ID!) {
    logoutUser(userId: $userId) {
      id
      isLoggedIn
    }
  }
`;
