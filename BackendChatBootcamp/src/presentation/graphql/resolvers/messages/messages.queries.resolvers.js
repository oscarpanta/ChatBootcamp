const messageController = require("../../../../controllers/Messages");



const queries = {
  messages: async () => {
    return await messageController.getMessages(); 
  },
  messagesByUser: async (_, { userId }) => {
    return await messageController.getMessagesByUserId(userId); 
  },
  getmessagesByUserReceive:async (_, { userId,receiverId }) => {
    return await messageController.getMessagesByUserIdReceive(userId,receiverId); 
  },
};


exports.Query = queries;
