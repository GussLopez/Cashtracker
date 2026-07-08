import type { Response, Request } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email }});
    if (userExists) {
      const error = new Error('Your email already registered');
      return res.status(409).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();
      await user.save();
      res.json('Account created');
    } catch (error) {
      res.status(500).json({ error: 'There was an error' });
    }
  }

   static login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email }});
     if (!user) {
      const error = new Error('Account not found');
      return res.status(409).json({ error: error.message });
    }

    res.json(user)
   }
}