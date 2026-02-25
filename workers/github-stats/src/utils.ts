import type { Stats, GradeResult } from './types';

export function calculateGrade(stats: Stats): GradeResult {
  const score =
    stats.total_stars * 10 +
    stats.total_commits * 2 +
    stats.total_pr * 5;

  if (score > 5000) return { grade: 'S+', percent: 95 };
  if (score > 3000) return { grade: 'S', percent: 90 };
  if (score > 1500) return { grade: 'A+', percent: 85 };
  if (score > 1000) return { grade: 'A', percent: 80 };
  if (score > 500) return { grade: 'A-', percent: 75 };
  if (score > 250) return { grade: 'B+', percent: 65 };
  if (score > 100) return { grade: 'B', percent: 55 };
  return { grade: 'C', percent: 40 };
}

export function transformStats(user: {
  name: string | null;
  login: string;
  repositories: { nodes: { stargazerCount: number }[] };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalRepositoriesWithContributedCommits: number;
  };
}): Stats {
  const totalStars = user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0,
  );

  return {
    name: user.name || user.login,
    total_stars: totalStars,
    total_commits: user.contributionsCollection.totalCommitContributions,
    total_pr: user.contributionsCollection.totalPullRequestContributions,
    total_issues: user.contributionsCollection.totalIssueContributions,
    total_contributed:
      user.contributionsCollection.totalRepositoriesWithContributedCommits,
  };
}
