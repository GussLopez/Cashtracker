import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get('/', BudgetController.getAll);

router.post('/',
  body('name')
    .notEmpty().withMessage('The budget name cant be empty'),
  body('amount')
    .notEmpty().withMessage('The budget amount cant be empty')
    .isNumeric().withMessage('Invalid quantity')
    .custom((value) => value > 0 ).withMessage('The budget must be 1 +'),
  handleInputErrors,
  BudgetController.create
);

router.get('/:id', 
  param('id').isInt().withMessage('Invalid ID')
    .custom(value => value > 0).withMessage('Invalid ID'),
  handleInputErrors,
  BudgetController.getById
);
router.put('/:id',
  param('id').isInt().withMessage('Invalid ID')
    .custom(value => value > 0).withMessage('Invalid ID'),
  body('name')
    .notEmpty().withMessage('The budget name cant be empty'),
  body('amount')
    .notEmpty().withMessage('The budget amount cant be empty')
    .isNumeric().withMessage('Invalid quantity')
    .custom((value) => value > 0 ).withMessage('The budget must be 1 +'),
  handleInputErrors,
  BudgetController.updateById
);
router.delete('/:id', BudgetController.deleteById);

export default router