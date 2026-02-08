import type { ContributionLevel } from "./githubApi";

export const LEVEL_COLORS: Record<ContributionLevel, string> = {
    NONE: "bg-[#ebedf0] dark:bg-[#161b22]",
    FIRST_QUARTILE: "bg-[#9be9a8] dark:bg-[#0e4429]",
    SECOND_QUARTILE: "bg-[#40c463] dark:bg-[#006d32]",
    THIRD_QUARTILE: "bg-[#30a14e] dark:bg-[#26a641]",
    FOURTH_QUARTILE: "bg-[#216e39] dark:bg-[#39d353]",
};
