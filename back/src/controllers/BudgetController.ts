import type { Response, Request } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["craetedAt", "DESC"]],
        //TODO: Filtrar por el user
      });

      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);

      await budget.save();

      res.status(201).json("Budget created");
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.json(req.budget);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);
    res.json("Budget updated");
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.json("Budget deleted");
  };
}
