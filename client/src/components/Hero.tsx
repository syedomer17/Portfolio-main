"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Eye, Mail, RefreshCw } from "lucide-react";

import { HiMenu } from "react-icons/hi";
import { FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";
import { SiBehance, SiBluesky } from "react-icons/si";
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
} from "../utils/githubApi";
import { LEVEL_COLORS } from "../utils/colors";
import { formatDateDDMMYYYY } from "../utils/date";

export default function Hero() {
  const [views] = useState(3300);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState("/myImage.png");
  const [isAnimating, setIsAnimating] = useState(false);
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent flash of unstyled content on initial load
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Fetch GitHub contribution data
  useEffect(() => {
    async function loadContributions() {
      try {
        const raw = await fetchGitHubContributions("syedomer17");
        setContributionData(normalizeContributionData(raw));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, []);

  // Don't render anything until mounted to prevent FOUC
  if (!mounted) {
    return null;
  }

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

              {/* More Button with Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-[#2E2E2E] sm:dark:bg-transparent border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
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
                      className="absolute bottom-full left-0 mb-2 w-40 bg-transparent dark:bg-transparent border border-slate-200 dark:border-[#3A3A3A] rounded-xl shadow-xl z-10 p-1.5"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-[#3A3A3A] hover:bg-slate-200 dark:hover:bg-[#454545] rounded-lg transition-colors mb-1">
                        <SiBehance className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Behance</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-[#3A3A3A] hover:bg-slate-200 dark:hover:bg-[#454545] rounded-lg transition-colors mb-1">
                        <FaDiscord className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Discord</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-[#3A3A3A] hover:bg-slate-200 dark:hover:bg-[#454545] rounded-lg transition-colors mb-1">
                        <SiBluesky className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Bluesky</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-[#3A3A3A] hover:bg-slate-200 dark:hover:bg-[#454545] rounded-lg transition-colors mb-1">
                        <FaInstagram className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Instagram</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-[#3A3A3A] hover:bg-slate-200 dark:hover:bg-[#454545] rounded-lg transition-colors">
                        <FaYoutube className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>YouTube</span>
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
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-2 px-1">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - (11 - i));
                        return (
                          <span key={i}>
                            {date.toLocaleString('default', { month: 'short' })}
                          </span>
                        );
                      })}
                    </div>

                    {/* Contribution Grid - Compact */}
                    <div className="flex gap-[2px]">
                      {contributionData.weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[2px]">
                          {week.contributionDays.map((day, di) => (
                            <div
                              key={di}
                              className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[day.contributionLevel]
                                } hover:ring-1 hover:ring-slate-400 dark:hover:ring-white transition-all cursor-pointer`}
                              title={`${formatDateDDMMYYYY(day.date)}: ${day.contributionCount} contributions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Legend */}
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
                      <div className="w-[10px] h-[10px] bg-[#216e39] dark:bg-[#39d353] rounded-[2px]" />
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
