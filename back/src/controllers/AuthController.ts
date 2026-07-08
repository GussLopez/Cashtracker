import type { Response, Request } from "express";
import User from "../models/User";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      
      await user.save();
      res.json('Account created');
    } catch (error) {
      res.status(500).json({ error: 'There was an error' });
    }
  }
}