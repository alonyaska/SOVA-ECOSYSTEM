import { useQuery } from "@tanstack/react-query";

export interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  updatedAt: string | null;
}

function parseRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export function useGitHubStats(repoUrl?: string) {
  const parsed = repoUrl ? parseRepo(repoUrl) : null;

  return useQuery({
    queryKey: ["github-stats", parsed?.owner, parsed?.repo],
    queryFn: async () => {
      if (!parsed) throw new Error("Invalid repo URL");
      const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
      const data = await res.json();
      return {
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        language: data.language ?? null,
        description: data.description ?? null,
        updatedAt: data.pushed_at ?? null,
      } satisfies GitHubStats;
    },
    enabled: !!parsed,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
}
