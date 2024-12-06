
const subscriptions = {
  userAdded: {
    subscribe: (_,__,context) => {
      console.log(`Mensaje publicado en canal: user add subsc`);
      return context.pubsub.asyncIterableIterator(`USER_ADDED`);
    },
  },
  userLoggedOut: {
    subscribe: (_, __, context)=>context.pubsub.asyncIterableIterator("USER_LOGGED_OUT"),
  },
};

exports.Subscription = subscriptions;
