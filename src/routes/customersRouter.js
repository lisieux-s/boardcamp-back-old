import { Router } from 'express';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
} from '../controllers/customersController.js';

import customerSchema from '../schemas/customerSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js'

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', validateSchemaMiddleware(customerSchema),createCustomer);
customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;
