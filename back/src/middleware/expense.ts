import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateExpenseInput = async ( req: Request, res: Response, next: NextFunction ) => {
  await body('name')
    .notEmpty().withMessage('The budget name cant be empty').run(req)
  await body('amount')
    .notEmpty().withMessage('The budget amount cant be empty')
    .isNumeric().withMessage('Invalid quantity')
    .custom((value) => value > 0 ).withMessage('The budget must be 1 +').run(req)
  next();
}