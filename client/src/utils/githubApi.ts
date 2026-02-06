export interface ContributionDay {
    date: string;
    contributionCount: number;
    contributionLevel: number; // 0-4
}

export interface ContributionData {
    totalContributions: number;
    days: ContributionDay[];
}

/**
 * Fetches GitHub contribution data from the backend API
 * @param username - GitHub username
 * @returns Contribution data for the past 365 days
 */
export async function fetchGitHubContributions(
    username: string
): Promise<ContributionData> {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

    try {
        const response = await fetch(`${API_URL}/api/github-contributions/${username}`);

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        throw error;
    }
}

/**
 * Generates mock contribution data for fallback/testing
 */
export function generateMockContributions(): ContributionData {
    const days: ContributionDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const level = Math.floor(Math.random() * 5);
        const count = level === 0 ? 0 : level * 3;

        days.push({
            date: date.toISOString().split('T')[0],
            contributionCount: count,
            contributionLevel: level,
        });
    }

    const totalContributions = days.reduce((sum, day) => sum + day.contributionCount, 0);

    return {
        totalContributions,
        days,
    };
}
