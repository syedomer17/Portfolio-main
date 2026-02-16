"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";

import {
  fetchGitHubContributionYears,
  type ContributionYearData,
  type ContributionYearsResponse,
} from "../../utils/githubApi";

type TooltipState = {
  x: number;
  y: number;
  content: string;
} | null;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const formatDateForTooltip = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getMonthLabels = (weeks: ContributionYearData["weeks"]) => {
  const months: { [key: string]: string } = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const labels = weeks.map((week, index) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return null;
    const monthIndex = new Date(firstDay.date).getMonth();

    if (
      index === 0 ||
      new Date(weeks[index - 1].contributionDays[0].date).getMonth() !==
        monthIndex
    ) {
      return (
        <div
          key={index}
          className="text-xs text-secondary w-2.5 text-center font-mono opacity-50 dark:text-slate-400"
          style={{ marginLeft: index === 0 ? 2 : 0 }}
        >
          {months[monthIndex]}
        </div>
      );
    }

    return <div key={index} className="w-2.5" />;
  });

  return <div className="flex gap-[2px] mb-1">{labels}</div>;
};

const getContributionIntensity = (count: number, maxCount: number) => {
  if (count === 0) {
    return "bg-[#ebedf0] dark:bg-[#161b22] ring-1 ring-slate-200/60 dark:ring-black/30";
  }

  const effectiveMax = Math.max(7, Math.min(maxCount, 15));
  const ratio = count / effectiveMax;

  if (ratio <= 0.25) {
    return "bg-[#9be9a8] dark:bg-[#0e4429]";
  }
  if (ratio <= 0.5) {
    return "bg-[#40c463] dark:bg-[#006d32]";
  }
  if (ratio <= 0.75) {
    return "bg-[#30a14e] dark:bg-[#26a641]";
  }
  return "bg-[#216e39] dark:bg-[#39d353]";
};

function ContributionYearGraph({
  yearData,
}: {
  yearData: ContributionYearData;
}) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);

  const maxCount = Math.max(
    1,
    ...yearData.weeks.flatMap((week) =>
      week.contributionDays.map((day) => day.contributionCount)
    )
  );

  const isCurrentYear = yearData.year === new Date().getFullYear();

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    day: ContributionYearData["weeks"][number]["contributionDays"][number]
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const graphRect = graphRef.current?.getBoundingClientRect();
    if (!graphRect) return;

    const content =
      day.contributionCount === 0
        ? `No contributions on ${formatDateForTooltip(day.date)}`
        : `${day.contributionCount} contribution${
            day.contributionCount !== 1 ? "s" : ""
          } on ${formatDateForTooltip(day.date)}`;

    setTooltip({
      x: rect.left + rect.width / 2 - graphRect.left,
      y: rect.top - graphRect.top - 8,
      content,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-semibold text-slate-900 dark:text-white">
          {yearData.year}:
        </span>
        <span>
          {formatNumber(yearData.totalContributions)} Contributions
          {isCurrentYear ? " (so far)" : ""}
        </span>
      </div>

      <div ref={graphRef} className="relative">
        <div className="overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:px-0">
          <div className="w-max min-w-full">
            {getMonthLabels(yearData.weeks)}

            <div className="flex gap-[2px]">
              {yearData.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={`${day.date}-${dayIndex}`}
                      className={`w-[10px] h-[10px] rounded-[2px] ${getContributionIntensity(
                        day.contributionCount,
                        maxCount
                      )} hover:ring-1 hover:ring-slate-400 dark:hover:ring-white transition-all cursor-pointer`}
                      onMouseEnter={(event) => handleMouseEnter(event, day)}
                      onMouseLeave={handleMouseLeave}
                      aria-label={
                        day.contributionCount === 0
                          ? `No contributions on ${formatDateForTooltip(day.date)}`
                          : `${day.contributionCount} contribution${
                              day.contributionCount !== 1 ? "s" : ""
                            } on ${formatDateForTooltip(day.date)}`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {tooltip && (
          <div
            className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: "translateX(-50%) translateY(-100%)",
            }}
          >
            {tooltip.content}
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatNumber(yearData.totalContributions)} activities in {yearData.year}
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-[10px] h-[10px] bg-[#ebedf0] dark:bg-[#161b22] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#9be9a8] dark:bg-[#0e4429] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#40c463] dark:bg-[#006d32] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#30a14e] dark:bg-[#26a641] rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-[#216e39] dark:bg-[#39d353] rounded-[2px]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Syedomer17() {
  const router = useRouter();
  const [data, setData] = useState<ContributionYearsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetchGitHubContributionYears("syedomer17");
        if (isMounted) setData(response);
      } catch (error) {
        console.error("Failed to load contributions", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalContributions = useMemo(() => {
    if (!data) return 0;
    return data.years.reduce((sum, year) => sum + year.totalContributions, 0);
  }, [data]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0D10] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1
                className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: "Instagram Sans", fontWeight: "bold" }}
              >
                @syedomer17 on GitHub
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

          <p
            className="mt-1 text-sm text-slate-500 dark:text-slate-400"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            Total Contributions: {formatNumber(totalContributions)}
          </p>

          {loading && (
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-slate-100/70 to-slate-200/20 dark:from-white/5 dark:to-white/0 blur-xl" />
                <div className="absolute -inset-1 rounded-full border border-slate-200/70 dark:border-slate-700/60" />
                <div className="w-28 h-28 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-[#121417] flex items-center justify-center shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.18),transparent_60%)]" />
                  <svg
                    viewBox="0 0 120 120"
                    className="w-20 h-20 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  >
                    <rect x="18" y="64" width="84" height="12" rx="6" fill="currentColor" opacity="0.22" />
                    <rect x="28" y="72" width="64" height="22" rx="7" fill="currentColor" opacity="0.16" />
                    <rect x="22" y="44" width="76" height="16" rx="8" fill="currentColor" opacity="0.3" />
                    <circle cx="60" cy="34" r="16" fill="currentColor" opacity="0.36" />
                    <rect x="44" y="52" width="32" height="9" rx="4.5" fill="currentColor" opacity="0.24" />
                    <circle cx="36" cy="24" r="4" fill="currentColor" opacity="0.5" />
                    <circle cx="84" cy="26" r="3" fill="currentColor" opacity="0.45" />
                    <rect x="38" y="90" width="44" height="6" rx="3" fill="currentColor" opacity="0.18" />
                  </svg>
                </div>
              </div>
              <div>
                <p
                  className="text-sm text-slate-600 dark:text-slate-300"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                >
                  Loading contribution history...
                </p>
                <p
                  className="text-xs text-slate-400 dark:text-slate-500 mt-1"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                >
                  Fetching yearly activity and totals.
                </p>
              </div>
            </div>
          )}

          {!loading && !data && (
            <div className="mt-8 text-sm text-rose-500">
              Failed to load contributions. Please try again later.
            </div>
          )}

        {!loading && data && (
          <div className="mt-8 space-y-10" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
            {data.years.map((yearData) => (
              <ContributionYearGraph
                key={yearData.year}
                yearData={yearData}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
