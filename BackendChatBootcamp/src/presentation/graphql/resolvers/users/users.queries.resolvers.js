const userController = require("../../../../controllers/users");


const queries = {
  // users: (parent, {search}, context, info) => userController.getUsers()
  users: async (parent, {search}, context, info) => {
    return await userController.getUsers({search});
  },
  user: async (_, { id }) => {
    return await userController.getUserById(id); 
  },
};

exports.Query = queries;