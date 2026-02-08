"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, HandMetal } from "lucide-react";

const blogs = [
  {
    title: "My GSOC Journey: The 2-Month Sprint from Doubt to Done",
    date: "Jun 2025",
    views: 340,
    tags: ["GSOC", "Open Source"],
    url: "#"
  },
  {
    title: "JWT Authentication APIs with TypeScript, Node.js, and MongoDB.",
    date: "Feb 2025",
    views: 52,
    tags: ["Authentication", "TypeScript", "MongoDB"],
    url: "#"
  },
  {
    title: "Docker with Node.js & Express.js — Basics.",
    date: "Feb 2025",
    views: 20,
    tags: ["Docker", "Node.js", "Express.js"],
    url: "#"
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="container mx-auto px-4 sm:px-6 pb-16">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[18.4px] leading-[23px] font-bold mt-2 mb-3 text-[#333333] dark:text-[#EBEBEB]"
          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
        >
          Blogs
        </motion.h2>

        {/* Separator line */}
        <div className="w-full h-px border-t border-dashed border-gray-300 dark:border-[#333] mb-6"></div>

        <div className="space-y-0">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <a
                href={blog.url}
                className="group block py-4 hover:bg-transparent transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-[#D4D4D4] dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: '"Instagram Sans", sans-serif',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        letterSpacing: 'normal'
                      }}
                    >
                      {blog.title}
                    </h3>

                    <div
                      className="flex items-center gap-3 text-gray-500 dark:text-[#D4D4D4] mb-3"
                      style={{
                        fontFamily: '"Instagram Sans", sans-serif',
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: 500,
                        letterSpacing: 'normal'
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-[#D4D4D4] border-r border-[#333] pr-2 h-4" style={{ fontSize: '12px', fontWeight: 500 }}>
                        <HandMetal className="w-3.5 h-3.5 dark:text-[#D4D4D4]" />
                        <span>{blog.views}</span>
                      </div>

                      {blog.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 dark:bg-transparent text-gray-600 dark:text-[#D4D4D4] rounded-[4px] border border-transparent dark:border-[#333]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-[#666] group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 mt-1" />
                </div>
              </a>
              {/* Dashed Separator below each item except likely the last one if desired, but image shows separators. Logic here adds below each. */}
              {index < blogs.length && (
                <div className="w-full h-px border-t border-dashed border-gray-200 dark:border-[#262626] mt-0"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-[#1C1C1C] text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#2A2A2A] transition-all duration-300"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            View All
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
