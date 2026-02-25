import type { Env } from './types';
import { fetchGitHubStats } from './graphql';
import { calculateGrade, transformStats } from './utils';
import { buildSVG } from './svg';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, max-age=1800',
};
const SVG_HEADERS = {
  'Content-Type': 'image/svg+xml',
  'Cache-Control': 'public, max-age=1800',
};

interface GraphQLResponse {
  errors?: Array<{ message: string }>;
  data?: {
    user?: {
      name: string | null;
      login: string;
      repositories: { nodes: { stargazerCount: number }[] };
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalRepositoriesWithContributedCommits: number;
      };
    } | null;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const { pathname, searchParams } = url;

      if (!['/', '/api', '/api/json'].includes(pathname)) {
        return new Response('Not Found', { status: 404 });
      }

      const username = searchParams.get('username');
      if (!username) {
        return new Response('Missing username parameter', { status: 400 });
      }

      if (!env.GITHUB_TOKEN) {
        return new Response('Missing GITHUB_TOKEN', { status: 500 });
      }

      const res = await fetchGitHubStats(username, env.GITHUB_TOKEN);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`GitHub API ${res.status}: ${text}`);
      }

      const data: GraphQLResponse = await res.json();

      if (data.errors) {
        throw new Error(JSON.stringify(data.errors));
      }

      if (!data?.data?.user) {
        throw new Error('User not found');
      }

      const stats = transformStats(data.data.user);
      const grade = calculateGrade(stats);

      if (pathname === '/api/json') {
        return new Response(
          JSON.stringify({
            ...stats,
            grade: grade.grade,
            percent: grade.percent,
          }),
          { headers: JSON_HEADERS },
        );
      }

      const svg = buildSVG(stats, grade, searchParams);
      return new Response(svg, { headers: SVG_HEADERS });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
