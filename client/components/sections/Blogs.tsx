"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, HandMetal } from "lucide-react";
import { useRouter } from "next/navigation";

import { blogs } from "../../data/blogs";

export default function Blogs() {

  const router = useRouter();
  return (
    <section id="blogs" className="container mx-auto px-4 sm:px-6 pb-0">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[18.4px] leading-[23px] font-bold mt-4 mb-3 text-[#333333] dark:text-[#EBEBEB]"
          style={{ fontFamily: '"Instagram Sans", sans-serif' }}
        >
          Blogs
        </motion.h2>

        {/* Separator line */}
        <div className="w-full h-px bg-slate-200 dark:bg-[#333] "></div>

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
                      className="text-[#333333] font-bold dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: '"Instagram Sans", sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.4',
                        fontWeight: 700,
                        letterSpacing: 'normal'
                      }}
                    >
                      {blog.title}
                    </h3>

                    <div
                      className="flex items-center gap-3 text-[#70717B] dark:text-[#D4D4D4] mb-3"
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
                          className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 dark:bg-transparent text-[#424242] dark:text-[#D4D4D4] rounded-[4px] border border-transparent dark:border-[#333]"
                          style={{
                            fontFamily: '"Instagram Sans", sans-serif',
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: 400,
                            letterSpacing: 'normal'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-[#666] group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 mt-1 hidden sm:block" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => router.push("/blogs")}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200"
            style={{ fontFamily: '"Instagram Sans", sans-serif' }}
          >
            View All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
