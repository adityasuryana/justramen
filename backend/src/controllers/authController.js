import Account from "../models/Account.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const  login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (account.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: account._id, email: account.email },
      "test", // Replace with your actual secret key
      { expiresIn: "1h" }
    );

    // Optionally, you can set the token in a cookie or return it in the response

    // Here you would typically generate a token and send it back
    res.status(200).json({ message: "Login successful", account, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

export default login;