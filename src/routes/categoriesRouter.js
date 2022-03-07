import { Router } from 'express';

import {
  createCategory,
  getCategories,
} from '../controllers/categoriesController.js';

import categorySchema from '../schemas/categorySchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js'

const categoriesRouter = Router();

categoriesRouter.post('/categories', validateSchemaMiddleware(categorySchema), createCategory);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;