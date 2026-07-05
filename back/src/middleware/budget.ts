import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async ( req: Request, res: Response, next: NextFunction ) => {
  await param("id")
    .isInt()
    .withMessage("Invalid ID")
    .custom((value) => value > 0)
    .withMessage("Invalid ID")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateBudgetExist = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByPk(Number(id));

   if (!budget) {
      const error = new Error("Budget not found");
      res.status(404).json({ error: error.message });
      return;
    }
    req.budget = budget;

    next();
  } catch (error) {
    res.status(500).json({ error: "There was an error" });
  }
};
