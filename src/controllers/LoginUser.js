import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
     
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid password" });
      }
      return res.json( {
        token: jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: authConfig.expireIn,
        }),
        role: user.role,
        expireIn: authConfig.expireIn
      });
    } catch (error) {
      return res.json({ error });
    }
  },
};
