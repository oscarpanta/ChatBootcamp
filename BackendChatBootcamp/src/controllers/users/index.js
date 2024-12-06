class UserController {
    users = [
      {
        id: "1",
        firstName: "Laura",
        lastName: "Marquez",
        isLoggedIn: false
      },
      {
        id: "2",
        firstName: "Juan",
        lastName: "Ceballos",
        isLoggedIn: false

      },
      {
        id: "3",
        firstName: "Luis",
        lastName: "Saucedo",
        isLoggedIn: false

      },
    ];
    async createUser(firstName, lastName,isLoggedIn) {
      const newUser = {
        id: (this.users.length + 1).toString(), 
        firstName,
        lastName,
        isLoggedIn
      };
  
      this.users.push(newUser);
      return newUser;
    }
    async getUsers({search}) {
      // console.log('usersss',this.users)
      // console.log('userfilt',this.users.filter((user) => user.firstName.includes(search)))
      return this.users.filter((user) => user.firstName.includes(search));
      // return this.users
    }
    async getUserById(userId){
 
      console.log(userId)
      return this.users.find((user)=>user.id===userId)
    }
    async getUsersById(userIds =[]){
      return this.users.filter((user)=>userIds.includes(user.id))
    }
  }
  const userController = new UserController();
  module.exports = userController;
  