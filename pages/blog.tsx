// pages/blog.tsx
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CalendarDays, User, ArrowRight, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: string;
}

type SortOrder = "recent" | "oldest";

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDir);

  const posts: PostMeta[] = [];
  for (const filename of filenames) {
    if (filename.endsWith(".mdx")) {
      const file = await fs.readFile(path.join(postsDir, filename), "utf8");
      const { data } = matter(file);
      posts.push({ slug: filename.replace(/\.mdx$/, ""), ...data } as PostMeta);
    }
  }

  return { props: { posts } };
}

export default function Blog({ posts }: { posts: PostMeta[] }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase();
      return (
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      );
    });
  }, [posts, searchQuery]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.dateISO).getTime();
      const dateB = new Date(b.dateISO).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredPosts, sortOrder]);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Latest Updates | Atlas HomeServices</title>
        <link
          rel="canonical"
          href="https://atlas-paint.com/blog/"
          hrefLang="en"
        />
        <meta
          name="description"
          content="Discover expert tips on residential and commercial painting from trusted painting contractors in Toronto, Mississauga, Vaughan, and beyond."
        />
      </Head>
      <Header />
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Latest Updates
            </h1>
            <p className="text-gray-600 text-lg">
              Insights, news, and expert perspectives
            </p>
          </motion.div>

          <div className="filters mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="search flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <Select
                  value={sortOrder}
                  onValueChange={(value: string) => setSortOrder(value as SortOrder)}
                >
                  <SelectTrigger className="w-[180px] bg-white text-black border-gray-200 hover:border-gray-200 focus:border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem className="rounded-md hover:bg-black hover:text-white" value="recent">
                      Most Recent
                    </SelectItem>
                    <SelectItem className="rounded-md hover:bg-black hover:text-white" value="oldest">
                      Oldest
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mt-12">
              {sortedPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="p-6 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-12">
              No posts found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}