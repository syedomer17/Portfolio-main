import { NextResponse } from "next/server";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionData = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type ContributionYearData = ContributionData & {
  year: number;
};

type ContributionYearsResponse = {
  username: string;
  years: ContributionYearData[];
};

const buildYearRange = (year: number, today: Date) => {
  const from = new Date(Date.UTC(year, 0, 1));
  const to =
    year === today.getFullYear()
      ? today
      : new Date(Date.UTC(year, 11, 31, 23, 59, 59));
  return { from, to };
};

function generateMockDataRange(from: Date, to: Date): ContributionData {
  const weeks: ContributionWeek[] = [];
  const currentDate = new Date(from);
  const startDate = new Date(from);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  currentDate.setTime(startDate.getTime());

  let totalContributions = 0;

  while (currentDate <= to) {
    const contributionDays: ContributionDay[] = [];

    for (let day = 0; day < 7; day++) {
      if (currentDate >= from && currentDate <= to) {
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
    weeks,
  };
}

async function fetchContributionYear(
  username: string,
  from: Date,
  to: Date,
  githubToken: string | undefined
): Promise<ContributionData> {
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
                color
              }
            }
          }
        }
      }
    }
  `;

  if (!githubToken) {
    return generateMockDataRange(from, to);
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (data.errors) {
    console.error("GitHub API Error:", data.errors[0]?.message);
    return generateMockDataRange(from, to);
  }

  return data.data.user.contributionsCollection.contributionCalendar;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const today = new Date();
  const years = [today.getFullYear(), today.getFullYear() - 1, today.getFullYear() - 2];

  try {
    const yearData: ContributionYearData[] = [];

    for (const year of years) {
      const { from, to } = buildYearRange(year, today);
      const calendar = await fetchContributionYear(
        username,
        from,
        to,
        githubToken
      );

      yearData.push({
        year,
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      });
    }

    const response: ContributionYearsResponse = {
      username,
      years: yearData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Fetch failed:", error);

    const fallbackYears: ContributionYearData[] = years.map((year) => {
      const { from, to } = buildYearRange(year, today);
      const calendar = generateMockDataRange(from, to);
      return {
        year,
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      };
    });

    return NextResponse.json({ username, years: fallbackYears });
  }
}
