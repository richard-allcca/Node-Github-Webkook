import { Request, Response, Router } from "express";
import { GithubService } from "../../services/github.service";
import { GithubController } from "./github.controller";
import { DiscordService } from "../../services/discord.service";


export class GithubRoutes {

  static get routes(): Router {

    const router = Router();

    const githubService = new GithubService();

    const discordService = new DiscordService();

    const controller = new GithubController(githubService, discordService);

    router.post('/github', controller.webHookHandler);

    return router;
  }

}