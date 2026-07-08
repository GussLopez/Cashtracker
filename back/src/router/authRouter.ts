import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/create-account', 
  body('name')
    .notEmpty().withMessage('The name cant be empty'),
  body('password')
    .isLength({ min: 8 }).withMessage('The password is too short, minimum 8 characters'),
  body('email')
    .isEmail().withMessage('Invalid email'),
  handleInputErrors,
  AuthController.createAccount
);

router.post('/login', 
  body('email')
    .isEmail().withMessage('Invalid email'),
  body('password')
    .notEmpty().withMessage('The password is required'),
  handleInputErrors,
  AuthController.login
);

export default router;