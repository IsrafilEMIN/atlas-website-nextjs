import fs from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDir);

  const posts: Post[] = [];

  for (const filename of filenames) {
    if (filename.endsWith(".mdx")) {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data: metadata } = matter(rawContent);

      posts.push({ ...metadata, slug } as Post);
    }
  }

  // Sort by latest
  posts.sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  res.status(200).json({ posts: posts.slice(0, 3) });
}
