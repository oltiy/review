import express from 'express';
import ResturantsService from '../services/resturant.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class ResturantMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.resturantName) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields`,
      });
    }
  }

  async validateSameNameDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const restrant = await ResturantsService.getResturantByName(req.body.name);
    if (restrant) {
      res.status(400).send({ error: `restrant name already exists` });
    } else {
      next();
    }
  }

  // Here we need to use an arrow function to bind `this` correctly
}

export default new ResturantMiddleware();
