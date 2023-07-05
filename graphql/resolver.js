const Users = require("../models/Users");

module.exports = {
  users: async () => {
    return await Users.find();
  },

  usersByCity: async ({ city }) => {
    return await Users.find({ location: city });
  },

  addUser: async ({ name, email, location, password }) => {
    const user = new Users({
      name: name,
      email: email,
      password: password,
      location: location,
    });
    try {
      const existingEmail = await Users.find({ email: email });
      if (existingEmail) return "Email already exists";
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      return error.message;
    }
  },

  login: async ({ input }) => {
    const { email, password } = input;
    const user = await Users.findOne({ email: email });
    if (!user) return "No user with that email found";
    console.log(user);
    if (user.password == password) {
      return "Authentication successful";
    } else {
      return "Invalid password";
    }
  },
};
