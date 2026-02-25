export interface Env {
  GITHUB_TOKEN: string;
}

export interface GitHubUser {
  name: string | null;
  login: string;
}

export interface Repository {
  stargazerCount: number;
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoriesWithContributedCommits: number;
}

export interface UserData {
  user: {
    name: string | null;
    login: string;
    repositories: {
      nodes: Repository[];
    };
    contributionsCollection: ContributionsCollection;
  } | null;
}

export interface Stats {
  name: string;
  total_stars: number;
  total_commits: number;
  total_pr: number;
  total_issues: number;
  total_contributed: number;
}

export interface GradeResult {
  grade: string;
  percent: number;
}
