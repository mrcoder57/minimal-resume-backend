import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const Userrole = process.env.ROLE;
const JWT_SECRET=process.env.secret_key

const registerUser = async (req, res) => {
  try {
    const { email, password,name } = req.body;
    const role = Userrole;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!email || !password || !role || !name) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const newUser = await prisma.user.create({
      data: { email, password:hashedPassword, role, name },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error",error: error.message});
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
        if (!isPasswordCorrect) {
          res.status(401).json({ error: "Invalid credentials" });
        } else {
          const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
          res.json({ message: "Login successful", user, token });
        }}
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" , error: error.message});
    }
  };
export { registerUser, loginUser};
