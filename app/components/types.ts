export interface GitHubProfile {
  login: string;
  name?: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
}

export interface GitHubUser {
  login: string;
  name?: string;
  followers: number;
  public_repos: number;
}

export interface GitHubRepo {
  stargazers_count: number;
}

export interface UserStats {
  name: string;
  login: string;
  followers: number;
  public_repos: number;
  total_stars: number;
  commits: number;
  prs: number;
  issues: number;
  contributed: number;
}

export interface Theme {
  name: string;
  bgColor: string;
  textColor: string;
  titleColor: string;
  iconColor: string;
  borderColor: string;
}

export interface ConfigState {
  theme: string;
  showIcons: boolean;
  borderRadius: number;
  bgColor: string;
  textColor: string;
  titleColor: string;
  iconColor: string;
  borderColor: string;
  hideBorder: boolean;
}

export type ColorSettingKey = keyof Pick<ConfigState, 'bgColor' | 'titleColor' | 'textColor' | 'iconColor'>;

export interface CopiedStates {
  url: boolean;
  md: boolean;
  html: boolean;
}
