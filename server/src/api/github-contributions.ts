import { Request, Response } from "express";

export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export async function githubContributionsHandler(
  req: Request,
  res: Response
) {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }

    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 365);

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("GITHUB_TOKEN missing");

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error("GitHub API failed");
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    const calendar =
      json.data.user.contributionsCollection.contributionCalendar;

    const result: ContributionData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "GitHub fetch failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
