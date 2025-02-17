import { Router } from "express";
import { GithubRoutes } from './github/github.routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Cambiar de router.get a router.use para manejar todas las rutas bajo /github
    router.use('/api',GithubRoutes.routes);

    return router;
  }

}