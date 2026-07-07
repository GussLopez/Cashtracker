import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseInput = async ( req: Request, res: Response, next: NextFunction ) => {
  await body('name')
    .notEmpty().withMessage('The expense name cant be empty').run(req)
  await body('amount')
    .notEmpty().withMessage('The expense amount cant be empty')
    .isNumeric().withMessage('Invalid quantity')
    .custom((value) => value > 0 ).withMessage('The expense must be 1 +').run(req)
  next();
}

export const validateExpenseId = async ( req: Request, res: Response, next: NextFunction ) => {
  await param('expenseId').isInt().custom(value => value > 0)
    .withMessage('Invalid ID').run(req);
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  next();
}

export const validateExpenseExist = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(Number(expenseId));

   if (!expense) {
      const error = new Error("Expense not found");
      res.status(404).json({ error: error.message });
      return;
    }
    req.expense = expense;

    next();
  } catch (error) {
    res.status(500).json({ error: "There was an error" });
  }
};