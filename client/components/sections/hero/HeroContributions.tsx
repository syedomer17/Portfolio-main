"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  fetchGitHubContributions,
  normalizeContributionData,
  type ContributionData,
  type ContributionDay,
  type ContributionWeek,
} from "@/utils/githubApi";

const scheduleIdle = (callback: () => void) => {
  if (typeof window === "undefined") return 0;
  const idleWindow = window as Window & {
    requestIdleCallback?: (
      cb: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
  };
  if (idleWindow.requestIdleCallback) {
    return idleWindow.requestIdleCallback(() => callback(), { timeout: 1500 });
  }
  return window.setTimeout(callback, 200);
};

const cancelIdle = (id: number) => {
  if (typeof window === "undefined") return;
  const idleWindow = window as Window & {
    cancelIdleCallback?: (handle: number) => void;
  };
  if (idleWindow.cancelIdleCallback) {
    idleWindow.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

export default function HeroContributions() {
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<{ x: number; y: number; content: string } | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);

  const formatDateForTooltip = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleMouseEnter = (event: React.MouseEvent, day: ContributionDay) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const graphRect = graphRef.current?.getBoundingClientRect();
    const content =
      day.contributionCount === 0
        ? `No contributions on ${formatDateForTooltip(day.date)}`
        : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatDateForTooltip(day.date)}`;
    if (!graphRect) return;
    setHoveredDay({
      x: rect.left + rect.width / 2 - graphRect.left,
      y: rect.top - graphRect.top - 8,
      content,
    });
  };

  const handleMouseLeave = () => setHoveredDay(null);

  const getMonthLabels = () => {
    if (!contributionData || !contributionData.weeks.length) return null;

    const months: { [key: number]: string } = {
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

    const labels = contributionData.weeks.map((week, i) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return null;
      const monthIndex = new Date(firstDay.date).getMonth();

      if (
        i === 0 ||
        (i > 0 &&
          new Date(contributionData.weeks[i - 1].contributionDays[0].date).getMonth() !== monthIndex)
      ) {
        return (
          <div
            key={i}
            className="text-xs w-2.5 text-center font-mono text-slate-700 dark:text-slate-300 opacity-100 dark:opacity-70"
            style={{ marginLeft: i === 0 ? 2 : 0 }}
          >
            {months[monthIndex]}
          </div>
        );
      }
      return <div key={i} className="w-2.5" />;
    });

    return <div className="flex gap-[2px] mb-1">{labels}</div>;
  };

  const generateMockData = () => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const currentDate = new Date(startDate);
    let totalContribs = 0;

    for (let week = 0; week < 53; week++) {
      const contributionDays: ContributionDay[] = [];
      for (let day = 0; day < 7; day++) {
        if (currentDate <= today) {
          const rand = Math.random();
          let contributionCount = 0;
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
    setContributionData({ totalContributions: totalContribs, weeks: weeks.slice(-53) });
  };

  const getContributionIntensity = (count: number, maxCount: number) => {
    if (count === 0) return "bg-[#ebedf0] dark:bg-[#161b22] border-none";

    const effectiveMax = Math.max(7, Math.min(maxCount, 15));
    const ratio = count / effectiveMax;

    if (ratio <= 0.25) return "bg-[#9be9a8] dark:bg-[#0e4429] border-none";
    if (ratio <= 0.5) return "bg-[#40c463] dark:bg-[#006d32] border-none";
    if (ratio <= 0.75) return "bg-[#30a14e] dark:bg-[#26a641] border-none";
    return "bg-[#216e39] dark:bg-[#39d353] border-none";
  };

  useEffect(() => {
    let isMounted = true;

    const idleId = scheduleIdle(() => {
      if (!isMounted) return;
      generateMockData();

      const loadContributions = async () => {
        try {
          const raw = await fetchGitHubContributions("syedomer17");
          if (!isMounted) return;
          setContributionData(normalizeContributionData(raw));
        } catch (err) {
          console.error(err);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      loadContributions();
    });

    return () => {
      isMounted = false;
      cancelIdle(idleId);
    };
  }, []);

  return (
    <div className="block mt-6 sm:-mt-2 sm:-mx-6 px-0 sm:pl-8 sm:pr-6">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <span className="text-xs text-slate-500 dark:text-slate-600">Loading contributions...</span>
        </div>
      ) : contributionData ? (
        <div ref={graphRef} className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:px-0">
            <div className="w-max min-w-full">
              {getMonthLabels()}

              <div className="flex gap-[2px]">
                {(() => {
                  const maxCount = Math.max(
                    ...contributionData.weeks.flatMap((w) =>
                      w.contributionDays.map((d) => d.contributionCount)
                    ),
                    0
                  );

                  return contributionData.weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[2px]">
                      {week.contributionDays.map((day, di) => (
                        <div
                          key={di}
                          className={`w-[10px] h-[10px] rounded-[2px] ${getContributionIntensity(
                            day.contributionCount,
                            maxCount
                          )} hover:ring-1 hover:ring-slate-400 dark:hover:ring-white transition-all cursor-pointer`}
                          onMouseEnter={(e) => handleMouseEnter(e, day)}
                          onMouseLeave={handleMouseLeave}
                        />
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {hoveredDay && (
            <div
              className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none whitespace-nowrap"
              style={{
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y}px`,
                transform: "translateX(-50%) translateY(-100%)",
              }}
            >
              {hoveredDay.content}
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {contributionData.totalContributions} activities in the last year
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
          <div className="mt-2 flex justify-end">
            <Link
              href="/syedomer17"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-instagram"
            >
              View full GitHub history
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
