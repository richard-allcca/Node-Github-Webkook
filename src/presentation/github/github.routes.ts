import { Request, Response, Router } from "express";
import { GithubService } from "../../services/github.service";
import { GithubController } from "./github.controller";


export class GithubRoutes {

  static get routes(): Router {

    const router = Router();

    const githubService = new GithubService();
    const controller = new GithubController(githubService);

    router.post('/github', controller.webHookHandler);

    return router;
  }

}