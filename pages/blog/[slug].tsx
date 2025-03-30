// pages/blog/[slug].tsx
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Header from "@/components/layout/Header";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: string;
  content: string;
}

const customComponents: Partial<Components> = {
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props}>
      {children}
    </h3>
  ),
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(dir);
  const paths = filenames
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ params: { slug: file.replace(/\.mdx$/, "") } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const file = await fs.readFile(
    path.join(process.cwd(), "content", "posts", `${slug}.mdx`),
    "utf-8"
  );
  const { data, content } = matter(file);

  return {
    props: {
      post: {
        ...data,
        content,
        slug,
      },
    },
  };
};

export default function SinglePostPage({ post }: { post: PostMeta }) {
  return (
    <>
      <Head>
        <title>{post.title} | Atlas HomeServices</title>
        <link
          rel="canonical"
          href={`https://atlas-paint.com/blog/${post.slug}/`}
          hrefLang="en"
        />
        <meta name="description" content={post.excerpt} />
      </Head>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-10 italic">
              By {post.author} on {post.date}
            </p>
            <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={customComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}