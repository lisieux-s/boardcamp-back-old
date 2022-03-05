import { Router } from 'express';
import {
  createGame,
  getGames,
} from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.post('/games', createGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;