import { Router } from 'express';
import {
  createGame,
  getGames,
} from '../controllers/gamesController.js';

import gameSchema from '../schemas/gameSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js'

const gamesRouter = Router();

gamesRouter.post('/games', validateSchemaMiddleware(gameSchema), createGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;