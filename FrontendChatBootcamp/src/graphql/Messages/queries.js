import { gql } from '@apollo/client';

export const GET_MESSAGESUSER = gql`
query($userId: ID!){
  messagesByUser(userId: $userId) {
    content,
    receiverId
    senderId
  timestamp
  }
}
`;
export const GET_MESSAGES_BY_USER = gql`
query($userId: ID!, $receiverId: ID!){
  getmessagesByUserReceive(userId: $userId, receiverId: $receiverId) {
   content
   timestamp
   senderId
   receiverId
  }
 }`;