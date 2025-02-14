

export class GithubService {

  constructor() {}

  async webHookHandler(username: string) {
    console.log(`Hello ${username} from GithubService`);
        
    return `Hello ${username} from GithubService`;
  }
}