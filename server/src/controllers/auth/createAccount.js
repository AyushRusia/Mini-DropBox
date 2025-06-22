import User from "../../models/user.js";

const createAccountController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ error: "User Already Exist" });

    const newUser = await User.create({
      username, password,
    })

    return res.status(201).json({ data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createAccountController;