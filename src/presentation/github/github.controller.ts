import { Request, Response } from "express";
import { GithubService } from "../../services/github.service";
import { DiscordService } from "../../services/discord.service";


export class GithubController {

  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService
  ) {}

  webHookHandler = async (req: Request, res: Response) => {
    // Obtiene el tipo de evento
    const gitHubEvent = req.headers['x-github-event'] ?? 'unknown';
    // Obtiene la firma del encabezado de la solicitud
    const signature = req.headers['x-hub-signature'] ?? 'unknown';
    // Obtiene el ID de entrega de la solicitud
    const payload = req.body;

    let message = '';

    switch (gitHubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
        break;

      case 'issues':
        message = this.githubService.onIssue(payload);
        break;

      default:
        res.status(202).send(`No action taken for ${gitHubEvent}`);
        return; // Asegura que no se envíe otra respuesta después
    }

    // Enviar mensaje a Discord
    await this.discordService.notify(message)
      .then(() => {
        res.status(200).send('Accepted');
      })
      .catch(() => {
        console.log('Error sending message to Discord');
        res.status(500).json({ error: 'Error sending message to Discord' });
      });

  };
}

