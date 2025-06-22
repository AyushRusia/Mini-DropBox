import User from "../../models/user.js";
import jwt from "jsonwebtoken";
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ error: "User Not found" });
    if (user.password === password) {
      const token = await jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d", });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      });
      return res.status(200).json({ username, token });
    }
    else return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(401).json({ error: "Internal Server Error" });
  }
};

export default loginController;