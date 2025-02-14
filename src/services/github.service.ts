import { GithubStartPayload } from "../interfaces/github-start.interface";
import { GithubIssueInterface } from './../interfaces/github-issues.interface';


export class GithubService {

  constructor() {}

  public onStar = (payload: GithubStartPayload) => {
    const { action, sender, repository } = payload;

    const message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  };

  public onIssue = (payload: GithubIssueInterface) => {
    const { action, issue, repository } = payload;

    if (action === 'opened') {
      return `Issue ${action} on ${repository.full_name} by ${issue.user.login} with title ${issue.title}`;
    }

    if (action === 'closed') {
      return `Issue ${action} on ${repository.full_name} by ${issue.user.login} with title ${issue.title}`;
    }

    if (action === 'reopened') {
      return `Issue ${action} on ${repository.full_name} by ${issue.user.login} with title ${issue.title}`;
    }

    return `No action taken for ${action}`;
  };

}