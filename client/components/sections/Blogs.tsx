"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

import { blogs } from "@/lib/blogs";

export default function Blogs() {

  const router = useRouter();
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return (
    <section id="blogs" className="container mx-auto px-4 sm:px-6 pb-0">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="dark:text-[#EBEBEB] font-bold font-instagram leading-[23px] mb-3 mt-4 text-[#333333] text-[18.4px]"
        >
          Blogs
        </motion.h2>

        {/* Separator line */}
        <div className="w-full h-px bg-slate-200 dark:bg-[#333] "></div>

        <p
          className="dark:text-slate-300 font-instagram mt-4 text-slate-600 text-sm"
        >
          Short, practical notes on Next.js, TypeScript, and DevOps. For hands-on examples, see the <a href="/projects" className="underline hover:no-underline">project case studies</a> and the <a href="/experiences" className="underline hover:no-underline">experience timeline</a>.
        </p>

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
                href={`/blogs/${blog.slug}`}
                className="group block py-4 hover:bg-transparent transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-[#333333] font-bold dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.4',
                        fontWeight: 700,
                        letterSpacing: 'normal'
                      }}
                    >
                      {blog.title}
                    </h3>

                    <div
                      className="flex items-center gap-3 text-[#70717B] dark:text-[#D4D4D4] mb-2"
                      style={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        fontWeight: 500,
                        letterSpacing: 'normal'
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                    </div>

                    <p
                      className="dark:text-[#D4D4D4] font-instagram text-[#70717B] text-sm"
                    >
                      {blog.description}
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
                      Read more
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
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
            className="bg-slate-900 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 font-instagram font-medium gap-2 group hover:bg-slate-800 inline-flex items-center px-4 py-2 rounded-md text-sm text-white"
          >
            View All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
