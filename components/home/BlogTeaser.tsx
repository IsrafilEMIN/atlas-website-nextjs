"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: string;
}

export default function BlogTeaser() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/latest-posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Painting Tips & Industry Insights
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our latest articles covering house painting, color selection, interior trends, commercial projects, and how to choose the right painting contractor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`https://atlas-paint.com/blog/${post.slug}/`} hrefLang="en" key={post.slug} className="group">
              <Card className="p-6 bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-3">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="https://atlas-paint.com/blog/"
            hrefLang="en"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-all duration-300"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
