const router = require("express").Router();
const User = require("../models/Users");
router.post("/register", async (req, res) => {
  const { name, email, password, location } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password,
    location: location,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ Message: error });
    console.log(error);
  }
});

module.exports = router;
