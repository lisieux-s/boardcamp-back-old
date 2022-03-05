import { Router } from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.post('/categories', createCategory);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;