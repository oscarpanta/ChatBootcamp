import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($content: String!, $senderId: ID!, $receiverId: ID!) {
    sendMessage(content: $content, senderId: $senderId, receiverId: $receiverId) {
      id
      content
      senderId
      receiverId
      timestamp
    }
  }
`;