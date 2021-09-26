import { CommonRoutesConfig } from '../common/common.routes.config';
import ResturantController from './controllers/resturant.controller';
import ResturantMiddleware from './middleware/resturant.middleware';
import express from 'express';

export class ResturantRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ResturantRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/resturant`)
      .get(ResturantController.listRestruant)
      .post(
        ResturantMiddleware.validateRequiredUserBodyFields,
        ResturantMiddleware.validateSameNameDoesntExist,
        ResturantController.createRestutant
      );

    this.app.param(`name`, ResturantMiddleware.validateSameNameDoesntExist);
    this.app
      .route(`/resturant/:name`)
      .all(ResturantMiddleware.validateSameNameDoesntExist)
      .get(ResturantController.getRestutantByName)
      .delete(ResturantController.removeResturant);

    this.app.put(`/resturant/:name`, [
      ResturantMiddleware.validateRequiredUserBodyFields,
      ResturantMiddleware.validateSameNameDoesntExist,
      ResturantController.put,
    ]);

    // this.app.patch(`/users/:userId`, [
    //   UsersMiddleware.validatePatchEmail,
    //   UsersController.patch,
    // ]);

    return this.app;
  }
}
