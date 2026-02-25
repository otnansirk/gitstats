const GITHUB_API = 'https://api.github.com/graphql';

export const STATS_QUERY = `
  query($username: String!, $sinceDate: DateTime!) {
    user(login: $username) {
      name
      login
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          stargazerCount
        }
      }
      contributionsCollection(from: $sinceDate) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
      }
    }
  }
`;

export function getSinceDate(): string {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return oneYearAgo.toISOString();
}

export async function fetchGitHubStats(
  username: string,
  token: string,
): Promise<Response> {
  const res = await fetch(GITHUB_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'GitStats-Cloudflare-Worker',
    },
    body: JSON.stringify({
      query: STATS_QUERY,
      variables: {
        username,
        sinceDate: getSinceDate(),
      },
    }),
  });

  return res;
}

export { GITHUB_API };
