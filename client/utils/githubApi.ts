import {env} from "process";

// Removed ContributionLevel as it's not used in the new API
export type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

export interface ContributionDay {
    date: string;
    contributionCount: number;
    color: string;
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
   // const API_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(
        `/api/github/contributions/${username}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch GitHub contributions");
    }

    return res.json();
}

export function normalizeContributionData(
    data: ContributionData
): ContributionData {
    // The new API returns data in the correct format (weeks), so we might not need heavy normalization.
    // However, to be safe and ensure we show exactly the last year/relevant days:

    // We can just return the data as is if the API is doing its job, or do a simple pass through.
    // Previous logic was fixing missing days or filtering.

    // Let's just return the data for now as the server logic (mock or real) is designed to return correct weeks.
    return data;
}
