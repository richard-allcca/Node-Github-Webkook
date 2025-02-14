import { Request, Response } from "express";
import { GithubService } from "../../services/github.service";


export class GithubController {

  constructor(
    private readonly githubService: GithubService
  ) {}

  webHookHandler = async (req: Request, res: Response) => {
    const { username = 'test name' } = req.params;

    return this.githubService.webHookHandler(username)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      })
  }
}