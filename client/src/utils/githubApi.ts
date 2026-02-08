export type ContributionLevel =
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";

export interface ContributionDay {
    date: string; // YYYY-MM-DD
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

export async function fetchGitHubContributions(
    username: string
): Promise<ContributionData> {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

    const res = await fetch(
        `${API_URL}/api/github-contributions/${username}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch GitHub contributions");
    }

    return res.json();
}

/* ---------------- NORMALIZER (CRITICAL FIX) ---------------- */

export function normalizeContributionData(
    data: ContributionData
): ContributionData {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - 365);

    const allDays = data.weeks.flatMap((w) => w.contributionDays);

    const filtered = allDays.filter((d) => {
        const date = new Date(d.date);
        return date >= start && date <= today;
    });

    const weeks: ContributionWeek[] = [];
    for (let i = 0; i < filtered.length; i += 7) {
        weeks.push({
            contributionDays: filtered.slice(i, i + 7),
        });
    }

    return {
        totalContributions: filtered.reduce(
            (sum, d) => sum + d.contributionCount,
            0
        ),
        weeks,
    };
}
