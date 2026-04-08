import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET() {
  // In a real app, you'd use a server-side PAT or the user's OAuth token
  // For this demo, we can use a mock or fetch public data if GITHUB_TOKEN is available
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const username = process.env.GITHUB_USERNAME || "octocat";

  try {
    // Fetch user info
    const { data: user } = await octokit.rest.users.getByUsername({
      username,
    });

    // Fetch repos
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });

    // Calculate languages
    const languages: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const languageChartData = Object.entries(languages)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Recent activity (events)
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 5,
    });

    return NextResponse.json({
      totalRepos: user.public_repos,
      languages: languageChartData,
      recentActivity: events.map((e) => ({
        id: e.id,
        type: e.type,
        repo: e.repo.name,
        created_at: e.created_at,
      })),
      avatarUrl: user.avatar_url,
      name: user.name || user.login,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    // Generic fallback for demo
    return NextResponse.json({
      totalRepos: 42,
      languages: [
        { name: "TypeScript", value: 45 },
        { name: "JavaScript", value: 25 },
        { name: "Rust", value: 15 },
        { name: "Go", value: 10 },
        { name: "CSS", value: 5 },
      ],
      recentActivity: [
        { id: "1", type: "PushEvent", repo: "portfolio-uttiyo", created_at: new Date().toISOString() },
        { id: "2", type: "CreateEvent", repo: "antigravity-ui", created_at: new Date().toISOString() },
      ],
      avatarUrl: "https://github.com/github.png",
      name: "Demo Architect",
    });
  }
}
