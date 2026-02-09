import { Request, Response } from "express";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export async function githubContributionsHandler(req: Request, res: Response) {
  const { username } = req.params;
  const githubToken = process.env.GITHUB_TOKEN;

  // Mock Data Generation Logic (Fallback from Github.tsx)
  const generateMockData = (): ContributionData => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const startDate = new Date(oneYearAgo);

    // Adjust start date to previous Sunday to align weeks
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const currentDate = new Date(startDate);
    let totalContribs = 0;

    // Generate 53 weeks to cover a full year + overlap
    for (let week = 0; week < 53; week++) {
      const contributionDays: ContributionDay[] = [];
      for (let day = 0; day < 7; day++) {
        // Only generate up to today
        if (currentDate <= today) {
          const rand = Math.random();
          let contributionCount = 0;

          // Weighted random contributions to simulate realistic activity
          if (rand > 0.7) contributionCount = Math.floor(Math.random() * 3) + 1;
          else if (rand > 0.85) contributionCount = Math.floor(Math.random() * 5) + 4;
          else if (rand > 0.95) contributionCount = Math.floor(Math.random() * 10) + 8;

          totalContribs += contributionCount;
          contributionDays.push({
            date: currentDate.toISOString().split("T")[0],
            contributionCount,
            color: contributionCount === 0 ? "#161b22" : "#39d353",
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (contributionDays.length > 0) {
        weeks.push({ contributionDays });
      }
    }

    return {
      totalContributions: totalContribs,
      weeks: weeks.slice(-53)
    };
  };

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    if (!githubToken) {
      console.warn("GITHUB_TOKEN is missing. Using mock data.");
      return res.json(generateMockData());
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API Error:", data.errors[0].message);
      return res.json(generateMockData());
    }

    res.json(data.data.user.contributionsCollection.contributionCalendar);
  } catch (err) {
    console.error("Failed to fetch contributions:", err);
    res.json(generateMockData());
  }
}
