"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Eye, Mail, RefreshCw } from "lucide-react";

import { HiMenu } from "react-icons/hi";
import { FaInstagram, FaYoutube, FaDiscord, FaMedium } from "react-icons/fa";
import { SiBehance, SiBluesky, SiLeetcode } from "react-icons/si";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { WordRotate } from "./ui/word-rotate";
import CountUp from "./ui/CountUp";
import ButtonCreativeTop from "./ui/creative/Button";
import GithubHoverCard from "./Github";
import TwitterHoverCard from "./Twitter";
import LinkedinHoverCard from "./Linkedin";
import MediumHoverCard from "./Medium";
import LeetcodeHoverCard from "./Leetcode";
import {
  fetchGitHubContributions,
  normalizeContributionData,
  type ContributionData,
  type ContributionDay,
  type ContributionWeek,
} from "../utils/githubApi";


export default function Hero() {
  const [views] = useState(3300);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState("/myImage.png");
  const [isAnimating, setIsAnimating] = useState(false);
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<{ x: number; y: number; content: string } | null>(null);

  const handleImageSwitch = () => {
    // Play audio
    const audio = new Audio('/audio/glitch.wav');
    audio.play().catch(err => console.log('Audio play failed:', err));

    // Show animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    // Toggle image
    setCurrentImage(currentImage === "/myImage.png" ? "/background-portfolio.png" : "/myImage.png");
  };

  // Format date for tooltip (from Github.tsx)
  const formatDateForTooltip = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Tooltip handlers (from Github.tsx)
  const handleMouseEnter = (event: React.MouseEvent, day: ContributionDay) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const content =
      day.contributionCount === 0
        ? `No contributions on ${formatDateForTooltip(day.date)}`
        : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatDateForTooltip(day.date)}`;
    setHoveredDay({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      content,
    });
  };

  const handleMouseLeave = () => setHoveredDay(null);

  // Generate month labels above the graph (from Github.tsx)
  const getMonthLabels = () => {
    if (!contributionData || !contributionData.weeks.length) return null;

    const months: { [key: string]: string } = {
      0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
      6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec",
    };

    const labels = contributionData.weeks.map((week, i) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return null;
      const monthIndex = new Date(firstDay.date).getMonth();

      // Show label only if first week or month changes from previous
      if (
        i === 0 ||
        (i > 0 &&
          new Date(contributionData.weeks[i - 1].contributionDays[0].date).getMonth() !== monthIndex)
      ) {
        return (
          <div
            key={i}
            className="text-xs text-secondary w-2.5 text-center font-mono opacity-50 dark:text-slate-400"
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

  // Generate mock data (from Github.tsx)
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
    // Using slice(-53) to match server logic and ensure consistency
    setContributionData({ totalContributions: totalContribs, weeks: weeks.slice(-53) });
  };

  // Get contribution intensity CSS class (Dynamic logic)
  const getContributionIntensity = (count: number, maxCount: number) => {
    if (count === 0) return "bg-[#161b22] border-none"; // Level 0: No contributions

    // Calculate intensity relative to the maximum contribution in the dataset
    const ratio = maxCount > 0 ? count / maxCount : 0;

    if (ratio <= 0.25) return "bg-[#0e4429] border-none"; // Level 1
    if (ratio <= 0.50) return "bg-[#006d32] border-none"; // Level 2
    if (ratio <= 0.75) return "bg-[#26a641] border-none"; // Level 3
    return "bg-[#39d353] border-none"; // Level 4
  };

  // Fetch GitHub contribution data
  useEffect(() => {
    generateMockData(); // Show mock data immediately
    async function loadContributions() {
      try {
        const raw = await fetchGitHubContributions("syedomer17");
        setContributionData(normalizeContributionData(raw));
      } catch (err) {
        console.error(err);
        // Keep mock data on error
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, []);



  return (
    <section className="container mx-auto px-4 sm:px-6 pt-20 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-2xl mx-auto relative"
      >
        {/* Theme Toggle - aligned with image top */}
        <div className="absolute top-0 -right-1 z-10">
          <ThemeToggle />
        </div>

        {/* Profile Header Row */}
        <div className="flex items-end gap-3 sm:gap-6 mb-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="w-26 h-26 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Image Switch Button - Top Right of Image */}
            <motion.button
              onClick={handleImageSwitch}
              className="absolute -right-8 sm:-right-12 top-[-0.1px] w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
              aria-label="Switch image"
            >
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <motion.div
                    key="loader"
                    className="w-4 h-4 rounded-full border-2 border-slate-400/30 border-t-slate-400 dark:border-slate-500/30 dark:border-t-slate-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Name and Title */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "Instagram Sans", fontWeight: "bold" }}>
              Syed Omer Ali
            </h1>
            <div className="flex items-center justify-between">
              <div className="text-slate-400 dark:text-slate-600 text-base">
                <WordRotate
                  words={[
                    "Indie Hacker",
                    "Full Stack Developer",
                    "DevOps Engineer",
                    "Cloud Engineer",
                    "Software Engineer",
                    "System Designer",
                  ]}
                  className="text-sm sm:text-base font-normal"
                />
              </div>
              {/* View Count */}
              <motion.div
                className="flex items-center gap-1 text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="text-sm leading-none flex">
                  <CountUp
                    from={0}
                    to={3.3}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  k
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section - Full Width Below Header */}
        <div className="space-y-6">
          {/* Bio */}
          <div className="space-y-3" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Hey, I'm Omer, a full stack developer who loves building clean, modern websites and apps where
              design, functionality, and even the smallest details matter, with a focus on making products that are
              both practical and visually satisfying.
            </p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Tech stack isn't my concern, I'm flexible with whatever the project needs, though I prefer modern
              frameworks and tools. I'm always open for new opportunities to learn and grow.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <ButtonCreativeTop href="#contact" icon={<CalendarDays className="w-4 h-4" />}>
              <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                Book an intro call
              </span>
            </ButtonCreativeTop>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                Send an email
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-slate-500 dark:text-[#94A3B8] text-sm mb-2 sm:mb-4 mt-6">
              Here are my <strong className="font-medium text-slate-900 dark:text-white">socials</strong>
            </p>
            <div className="flex flex-wrap gap-1.5">
              <GithubHoverCard />
              <TwitterHoverCard />
              <LinkedinHoverCard />
              <div className="hidden sm:inline-block">
                <MediumHoverCard />
              </div>
              <div className="hidden sm:inline-block">
                <LeetcodeHoverCard />
              </div>

              {/* More Button with Dropdown - Visible on all screens */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                >
                  <HiMenu className="w-4 h-4" />
                  <span>More</span>
                </motion.button>

                <AnimatePresence>
                  {showMoreMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 mb-2 w-40 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#3A3A3A] rounded-xl shadow-xl z-20 p-1.5"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      <a href="https://leetcode.com/syedomerali_200" target="_blank" rel="noopener noreferrer" className="flex sm:hidden items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>LeetCode</span>
                      </a>
                      <a href="https://medium.com/@syedomerali2006" target="_blank" rel="noopener noreferrer" className="flex sm:hidden items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaMedium className="w-4 h-4 text-black dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Medium</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaInstagram className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Instagram</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaYoutube className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>YouTube</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors">
                        <FaDiscord className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Discord</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* GitHub Contribution Graph */}
          <div className="block mt-6 sm:-mt-2 sm:-mx-6 px-0 sm:pl-8 sm:pr-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <span className="text-xs text-slate-500 dark:text-slate-600">Loading contributions...</span>
              </div>
            ) : contributionData ? (
              <>
                {/* Shared Scroll Container for Alignment */}
                <div className="overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:px-0">
                  <div className="w-max min-w-full">
                    {/* Month Labels */}
                    {getMonthLabels()}

                    {/* Contribution Grid - Compact */}
                    <div className="flex gap-[2px]">
                      {(() => {
                        // Calculate max contribution count for relative intensity
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

                {/* Tooltip */}
                {hoveredDay && (
                  <div
                    className="fixed z-50 px-2 py-1 text-xs text-white bg-gray-900 border border-gray-700 rounded shadow-lg pointer-events-none"
                    style={{
                      left: `${hoveredDay.x}px`,
                      top: `${hoveredDay.y}px`,
                      transform: "translateX(-50%) translateY(-100%)",
                    }}
                  >
                    {hoveredDay.content}
                  </div>
                )}

                {/* Bottom Legend */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {contributionData.totalContributions} activities in the last year
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px]" />
                      <div className="w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]" />
                      <div className="w-[10px] h-[10px] bg-[#006d32] rounded-[2px]" />
                      <div className="w-[10px] h-[10px] bg-[#26a641] rounded-[2px]" />
                      <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px]" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
    >
      {typeof icon === 'string' ? <span>{icon}</span> : icon}
      <span>{label}</span>
    </motion.a>
  );
}
