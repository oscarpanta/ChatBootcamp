const subscriptions = {
  messageSent: {
    subscribe: (_, { receiverId }, context) => {
      console.log(`Mensaje publicado en canal: MESSAGE_SENT_${receiverId}`);
      // return context.pubsub.asyncIterableIterator(`MESSAGE_SENT_${receiverId}`);
      return context.pubsub.asyncIterableIterator('MESSAGE_SENT');

    },
  },
};

exports.Subscription = subscriptions;
