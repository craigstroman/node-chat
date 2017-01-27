// Users model
const users = [];

module.exports = {
  setUser: (name) => {
    users.push(name);
  },
  getUsers: () => {
    return users;
  },
  nameExists: (name) => {
    return users.includes(name);
  },
  deleteUser: (name) => {
    for (let i = 0; i < users.length; i += 1) {
      if (name === users[i]) {
        users.splice(i, 1);
        break;
      }
    }
  },
};

