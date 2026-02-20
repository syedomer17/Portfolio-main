"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import { CalendarDays, Eye, Mail, RefreshCw } from "lucide-react";

import { HiMenu } from "react-icons/hi";
import { FaInstagram, FaYoutube, FaDiscord, FaMedium } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useState, useEffect } from "react";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { WordRotate } from "../ui/word-rotate";
import CountUp from "../ui/CountUp";
import ButtonCreativeTop from "../ui/creative/Button";
import GithubHoverCard from "../socialButtons/Github";
import TwitterHoverCard from "../socialButtons/Twitter";
import LinkedinHoverCard from "../socialButtons/Linkedin";
import MediumHoverCard from "../socialButtons/Medium";
import LeetcodeHoverCard from "../socialButtons/Leetcode";
import profileImage from "../../public/myImage.avif";
import altProfileImage from "../../public/background-portfolio.avif";
import Link from "next/link";
import { playSound } from "../../lib/audioUtils";

const HeroContributions = dynamic(() => import("./hero/HeroContributions"), {
  ssr: false,
  loading: () => (
    <div className="block mt-6 sm:-mt-2 sm:-mx-6 px-0 sm:pl-8 sm:pr-6">
      <div className="min-h-45 sm:min-h-60 flex items-center justify-center">
        <span className="text-xs text-slate-500 dark:text-slate-600">Loading contributions...</span>
      </div>
    </div>
  ),
});


export default function Hero() {
  const defaultViewCount = 3300;

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData>(profileImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewCount, setViewCount] = useState(defaultViewCount);

  const handleImageSwitch = () => {
    // Play audio - deferred to idle callback, won't block interaction
    playSound("/audio/glitch.wav", { volume: 0.7, timeout: 1000 });

    // Show animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 900);

    // Toggle image
    setCurrentImage((prev) => (prev === profileImage ? altProfileImage : profileImage));
  };

  useEffect(() => {
    let isMounted = true;
    const idleWindow =
      typeof window !== "undefined"
        ? (window as Window & {
            requestIdleCallback?: (
              cb: IdleRequestCallback,
              options?: IdleRequestOptions
            ) => number;
            cancelIdleCallback?: (handle: number) => void;
          })
        : null;

    const incrementViewCount = async () => {
      try {
        const response = await fetch("/api/view-count");
        if (!response.ok) {
          throw new Error("Failed to increment view count");
        }
        const data = await response.json();
        if (isMounted && typeof data?.count === "number") {
          setViewCount(data.count);
        }
      } catch (error) {
        console.error("View count error:", error);
      }
    };

    const idleId = idleWindow?.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => incrementViewCount(), { timeout: 1500 })
      : window.setTimeout(incrementViewCount, 200);

    return () => {
      isMounted = false;
      if (idleWindow?.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  const viewCountK = Number((viewCount / 1000).toFixed(1));



  return (
    <LazyMotion features={domAnimation}>
      <section className="container mx-auto px-4 sm:px-6 pt-20 pb-0">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-2xl mx-auto relative"
          style={{ willChange: "transform, opacity" }}
        >
        {/* Theme Toggle - aligned with image top */}
        <div className="absolute top-0 -right-1 z-10">
          <ThemeToggle />
        </div>

        {/* Profile Header Row */}
        <div className="flex items-end gap-3 sm:gap-6 mb-8">
          {/* Profile Image */}
            <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative shrink-0"
              style={{ willChange: "transform, opacity" }}
          >
            <div className="w-26 h-26 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 relative">
              <m.div
                key={currentImage.src}
                initial={{ opacity: 0 }}
                animate={
                  isAnimating
                    ? {
                        opacity: [0.85, 1, 0.9, 1, 0.95, 1],
                        x: [0, -3, 5, -2, 4, -1, 2, 0],
                        y: [0, 2, -3, 3, -2, 2, -1, 0],
                        filter: [
                          "none",
                          "contrast(1.75) saturate(1.7)",
                          "contrast(1.2) saturate(1.2)",
                          "none",
                        ],
                      }
                    : { opacity: 1, x: 0, y: 0, filter: "none" }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <Image
                  src={currentImage}
                  alt={currentImage === profileImage ? "Syed Omer Ali profile" : "Syed Omer Ali alternate profile"}
                  className="w-full h-full object-cover"
                  width={104}
                  height={104}
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  quality={80}
                  sizes="(max-width: 640px) 96px, 104px"
                />
              </m.div>

              <AnimatePresence>
                {isAnimating && (
                  <>
                    <m.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.75, 0.25, 0.8, 0.1, 0],
                        backgroundPositionY: ["0%", "120%"],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: "linear" }}
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                        mixBlendMode: "screen",
                      }}
                    />
                    <m.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0, x: 0 }}
                      animate={{
                        opacity: [0, 0.85, 0.3, 0.9, 0.2, 0],
                        x: [0, -8, 6, -4, 5, -2, 0],
                        clipPath: [
                          "inset(0 0 80% 0)",
                          "inset(12% 0 62% 0)",
                          "inset(32% 0 42% 0)",
                          "inset(58% 0 14% 0)",
                          "inset(22% 0 68% 0)",
                          "inset(45% 0 25% 0)",
                        ],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,64,129,0.4), rgba(0,200,255,0.4))",
                        mixBlendMode: "screen",
                      }}
                    />
                    <m.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0, x: 0 }}
                      animate={{
                        opacity: [0, 0.7, 0.2, 0.75, 0.15, 0],
                        x: [0, 7, -5, 4, -3, 2, 0],
                        clipPath: [
                          "inset(78% 0 0 0)",
                          "inset(58% 0 12% 0)",
                          "inset(28% 0 48% 0)",
                          "inset(8% 0 72% 0)",
                          "inset(42% 0 38% 0)",
                          "inset(18% 0 60% 0)",
                        ],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: "easeOut" }}
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(0,255,160,0.35), rgba(255,255,255,0.15))",
                        mixBlendMode: "screen",
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Image Switch Button - Top Right of Image */}
            <m.button
              onClick={handleImageSwitch}
              className="absolute -right-8 sm:-right-12 top-[-0.1px] w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
              aria-label="Switch image"
              style={{ willChange: "transform" }}
            >
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <m.div
                    key="loader"
                    className="w-4 h-4 rounded-full border-2 border-slate-400/30 border-t-slate-400 dark:border-slate-500/30 dark:border-t-slate-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <m.div
                    key="icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </m.div>
                )}
              </AnimatePresence>
            </m.button>
          </m.div>

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
              <m.div
                className="flex items-center gap-1 text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="text-sm leading-none flex">
                  <CountUp
                    from={0}
                    to={viewCountK}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  k
                </span>
              </m.div>
            </div>
          </div>
        </div>

        {/* Content Section - Full Width Below Header */}
        <div className="space-y-6">
          {/* Bio */}
          <div className="space-y-3" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Hey, I’m Omer, a full stack developer who builds clean, modern web applications with strong attention to design, performance, and the details most people ignore. I focus on shipping products that are reliable, scalable, and visually polished.
            </p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Start with my <Link href="/about" className="underline decoration-slate-300 hover:decoration-slate-500">about page</Link>, explore <Link href="/services" className="underline decoration-slate-300 hover:decoration-slate-500">services</Link>, review <Link href="/case-studies" className="underline decoration-slate-300 hover:decoration-slate-500">case studies</Link>, browse <Link href="/projects" className="underline decoration-slate-300 hover:decoration-slate-500">projects</Link>, read the <Link href="/blogs" className="underline decoration-slate-300 hover:decoration-slate-500">developer blog</Link>, and keep the <Link href="/resources" className="underline decoration-slate-300 hover:decoration-slate-500">resources</Link> handy for checklists and templates.
            </p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              I don’t chase tech stacks I choose tools based on the problem. I’m comfortable adapting fast, learning continuously, and taking ownership of real-world engineering challenges.
            </p>
            <div className="pt-1">
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">What I help with</p>
              <ul className="mt-2 space-y-1 text-slate-700 dark:text-slate-200 text-sm leading-relaxed list-disc list-inside">
                <li>Full stack web apps with Next.js, React, and Node.js</li>
                <li>API design, integrations, and data workflows</li>
                <li>Cloud deployment and DevOps automation</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <ButtonCreativeTop href="/intro-call" icon={<CalendarDays className="w-4 h-4" />}>
              <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                Book an intro call
              </span>
            </ButtonCreativeTop>
            <Link
              href="/send-email"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[9px] text-sm font-medium bg-white dark:bg-[#2E2E2E] text-slate-900 dark:text-[#D4D4D4] border border-slate-300 dark:border-transparent"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>
                Send an email
              </span>
            </Link>
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
                <m.button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-[#2E2E2E] border border-slate-300 dark:border-transparent rounded-md text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#3E3E3E] transition-colors"
                  style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                >
                  <HiMenu className="w-4 h-4" />
                  <span>More</span>
                </m.button>

                <AnimatePresence>
                  {showMoreMenu && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 min-[410px]:-left-16 min-[412px]:-left-15 min-[430px]:-left-12 sm:left-0 mb-2 w-40 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#3A3A3A] rounded-xl shadow-xl z-20 p-1.5"
                      style={{ fontFamily: '"Instagram Sans", sans-serif' }}
                    >
                      <Link href="https://leetcode.com/syedomerali_200" target="_blank" rel="noopener noreferrer" className="flex sm:hidden items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <SiLeetcode className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>LeetCode</span>
                      </Link>
                      <Link href="https://medium.com/@syedomerali2006" target="_blank" rel="noopener noreferrer" className="flex sm:hidden items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaMedium className="w-4 h-4 text-black dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Medium</span>
                      </Link>
                      <Link href="https://www.instagram.com/syedomer.me/" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaInstagram className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Instagram</span>
                      </Link>
                      <Link href="#" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors mb-1">
                        <FaYoutube className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>YouTube</span>
                      </Link>
                      <Link href="https://discord.com/channels/@syedomerali8642" className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#333] rounded-lg transition-colors">
                        <FaDiscord className="w-4 h-4 text-slate-700 dark:text-white" />
                        <span className="text-sm font-medium text-slate-700 dark:text-white" style={{ fontFamily: '"Instagram Sans", sans-serif' }}>Discord</span>
                      </Link>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <HeroContributions />
        </div>
      </m.div>
    </section>
  </LazyMotion>
  );
}

