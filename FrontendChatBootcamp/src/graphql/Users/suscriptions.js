import { gql } from "@apollo/client";

export const USER_ADDED_SUBSCRIPTION = gql`
  subscription userAdded {
    userAdded {
      firstName
      lastName
      isLoggedIn
    }
  }
`;

export const USER_LOGGED_OUT_SUBSCRIPTION = gql`
  subscription {
    userLoggedOut {
      id
    }
  }
`;
