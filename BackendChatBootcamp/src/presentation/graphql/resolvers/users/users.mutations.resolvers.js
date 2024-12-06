
const userController = require("../../../../controllers/users");


const mutations = {
  createUser: async (_, { firstName, lastName,isLoggedIn },context) => {
    context.pubsub.publish("USER_ADDED", { userAdded: {firstName,lastName,isLoggedIn} });
    return await userController.createUser(firstName, lastName,isLoggedIn);
  },
 
  loginUser: async (_, { id }) => {
    console.log('idid',id)
    const user = await userController.getUserById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    user.isLoggedIn = true; 
    return user;
  },
  logoutUser: async(parent, { userId },context) => {
    const user = await userController.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    user.isLoggedIn = false;
    context.pubsub.publish("USER_LOGGED_OUT", { userLoggedOut: { id: user.id } }); 
    return user;
  },
};

exports.Mutation = mutations;