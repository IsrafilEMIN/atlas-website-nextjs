// pages/blog/[slug].tsx
import { GetStaticPropsContext } from "next";
import path from "path";
import fs from "fs/promises";
import Head from "next/head";
import Header from "@components/layout/Header";
import ReactMarkdown, { Components } from "react-markdown";

interface Post {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    dateISO: string;
    category: string;
}

// Custom components to style your markdown (optional)
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
    // Add more elements if needed, e.g. p, ul, li, etc.
};

export async function getStaticPaths() {
    // Point to the directory where your post files live
    const postsDir = path.join(process.cwd(), "content", "posts");
    const filenames = await fs.readdir(postsDir);

    // Extract slugs from each .tsx post
    const slugs = filenames
        .filter((filename) => filename.endsWith(".tsx"))
        .map((filename) => filename.replace(/\.tsx$/, ""));

    // Generate a path for each slug
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false, // or true/false depending on your needs
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { slug } = context.params as { slug: string };
    // Dynamically import the post’s metadata object
    const { metadata } = await import(`../../content/posts/${slug}`);
    return {
        props: {
            post: metadata as Post,
        },
    };
}

export default function SinglePostPage({ post }: { post: Post }) {
    return (
        <>
            <Head>
                <title>{post.title} | My Blog</title>
            </Head>

            {/* Your global site header */}
            <Header />

            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-6 pt-32 pb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">{post.title}</h1>
                        <p className="text-sm text-gray-500 mb-10 italic">
                            By {post.author} on {post.date}
                        </p>
                        <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
                            <ReactMarkdown components={customComponents}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
