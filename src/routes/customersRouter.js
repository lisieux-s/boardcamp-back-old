import { Router } from 'express';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
} from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', createCustomer);
customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;
