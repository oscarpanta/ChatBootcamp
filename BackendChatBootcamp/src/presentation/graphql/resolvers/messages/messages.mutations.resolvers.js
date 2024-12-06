

const messageController = require('../../../../controllers/Messages')
const userController = require('../../../../controllers/users')
const mutations = {
  sendMessage: async (_, { content, senderId, receiverId },context) => {
    const sender = await userController.getUserById(senderId);
    const receiver = await userController.getUserById(receiverId);

    console.log(sender)
    console.log(receiver)
    if (!sender || !receiver) {
      throw new Error("Remitente o receptor no encontrado");
    }
    if (!sender.isLoggedIn) {
      throw new Error("El remitente debe estar logueado");
    }

    const newMessage = await messageController.createMessage(content, senderId, receiverId);

 
    context.pubsub.publish('MESSAGE_SENT', { messageSent: newMessage });


    return newMessage;
  },
};

exports.Mutation=mutations

