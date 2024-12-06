class MessageController {
    messages = [
      {
        id: "1",
        content: "Hola Juan, ¿cómo estás?",
        senderId: "1",
        receiverId: "2",
        timestamp: "2024-12-05T08:00:00Z",
      },
      {
        id: "2",
        content: "Hola Oscar, estoy bien, ¿y tú?",
        senderId: "2",
        receiverId: "1",
        timestamp: "2024-12-05T08:05:00Z",
      },
    ];
  
    async getMessages() {
      return this.messages;
    }
  
    async getMessagesByUserId(userId) {
      return this.messages.filter(
        (message) => message.senderId === userId || message.receiverId === userId
      );
    }
    async getMessagesByUserIdReceive(userId,receiverId) {
      return this.messages.filter(
        // (message) => message.senderId === userId && message.receiverId === receiverId
        (message) => (message.senderId === userId || message.receiverId===userId) && (message.receiverId === receiverId || message.senderId===receiverId)

      );
    }
  
    async createMessage(content, senderId, receiverId) {
      const newMessage = {
        id: (this.messages.length + 1).toString(),
        content,
        senderId,
        receiverId,
        timestamp: new Date().toISOString(),
      };
  
      this.messages.push(newMessage); 
      return newMessage;
    }
  }
  
  const messageController = new MessageController();
  module.exports = messageController;
  