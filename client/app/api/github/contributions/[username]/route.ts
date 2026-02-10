import { NextResponse } from "next/server";

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

function generateMockData(): ContributionData {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const currentDate = new Date(startDate);
  let totalContributions = 0;

  for (let week = 0; week < 53; week++) {
    const contributionDays: ContributionDay[] = [];

    for (let day = 0; day < 7; day++) {
      if (currentDate <= today) {
        const rand = Math.random();
        let contributionCount = 0;

        if (rand > 0.95) contributionCount = Math.floor(Math.random() * 10) + 8;
        else if (rand > 0.85) contributionCount = Math.floor(Math.random() * 5) + 4;
        else if (rand > 0.7) contributionCount = Math.floor(Math.random() * 3) + 1;

        totalContributions += contributionCount;

        contributionDays.push({
          date: currentDate.toISOString().split("T")[0],
          contributionCount,
          color: contributionCount === 0 ? "#161b22" : "#39d353",
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (contributionDays.length) {
      weeks.push({ contributionDays });
    }
  }

  return {
    totalContributions,
    weeks: weeks.slice(-53),
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json(
      { error: "Username required" },
      { status: 400 }
    );
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
      console.warn("GITHUB_TOKEN missing. Using mock data.");
      return NextResponse.json(generateMockData());
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: "no-store", // IMPORTANT for fresh data
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API Error:", data.errors[0]?.message);
      return NextResponse.json(generateMockData());
    }

    return NextResponse.json(
      data.data.user.contributionsCollection.contributionCalendar
    );
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json(generateMockData());
  }
}
