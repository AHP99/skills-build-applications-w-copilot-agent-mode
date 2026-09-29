import { Router, type Request, type Response, type NextFunction } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

function registerCollection(path: string, resourceModel: Model<any>) {
  apiRouter.get(`/${path}/`, async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const records = await resourceModel.find().lean();
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  registerCreateRoute(path, resourceModel);
}

function registerCreateRoute(path: string, resourceModel: Model<any>) {
  apiRouter.post(`/${path}/`, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await resourceModel.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });
}

registerCollection('users', User);
registerCollection('teams', Team);
registerCollection('activities', Activity);
registerCollection('workouts', Workout);

apiRouter.get('/leaderboard/', async (_request, response, next) => {
  try {
    const entries = await LeaderboardEntry.find()
      .sort({ points: -1 })
      .populate('user', 'username displayName')
      .lean();
    response.json(entries);
  } catch (error) {
    next(error);
  }
});

registerCreateRoute('leaderboard', LeaderboardEntry);

export default apiRouter;
