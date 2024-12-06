import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSent($receiverId: ID!) {
    messageSent(receiverId: $receiverId) {
      id
      content
      senderId
      receiverId
      timestamp
    }
  }
`;