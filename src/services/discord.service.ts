import { envs } from "../config/envs";



export class DiscordService {

  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {
  }

  public notify = async (message: string) => {
    const body = {
      content: message,
      embeds: [
        {
          title: 'Título del Embed',
          description: 'Descripción del Embed',
          url: 'https://example.com',
          color: 0x0099ff,
          author: {
            name: 'Nombre del Autor',
            url: 'https://github.com/richard-allcca/Node-Github-Webkook',
            icon_url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzYxZXZkNzdocGUwb212YnR0Z2c4cHg3dXpuYjQ2aHFseDhjbnF4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rS6hNEBJYqy3Tfo9yS/giphy.gif'
          },
          fields: [
            {
              name: 'Campo 1',
              value: 'Valor del Campo 1',
              inline: true
            },
            {
              name: 'Campo 2',
              value: 'Valor del Campo 2',
              inline: true
            }
          ],
          thumbnail: {
            url: 'https://images.unsplash.com/photo-1663045579290-4785a5c424fe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJsdWUlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D'
          },
          image: {
            url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzYxZXZkNzdocGUwb212YnR0Z2c4cHg3dXpuYjQ2aHFseDhjbnF4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rS6hNEBJYqy3Tfo9yS/giphy.gif'
          },
          footer: {
            text: 'Texto del Pie de Página',
            icon_url: 'https://example.com/footer-icon.png'
          },
          timestamp: new Date()
        },
      ]
    }

    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok){
      console.error('Error sending message to Discord');
      return false;
    }

    return true;

  }
}