// pages/posts/[slug].tsx
import { GetStaticPropsContext } from "next";
import path from "path";
import fs from "fs/promises";
import Head from "next/head";
import Header from "@/components/layout/Header";

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

export async function getStaticPaths() {
    // read the same directory as in blog.tsx
    const postsDir = path.join(process.cwd(), "pages", "posts");
    const filenames = await fs.readdir(postsDir);

    // Build an array of possible slugs
    const slugs = [];
    for (const filename of filenames) {
        if (filename.endsWith(".ts")) {
            // e.g. "my-first-post.ts" => slug = "my-first-post"
            slugs.push(filename.replace(/\.ts$/, ""));
        }
    }

    return {
        paths: slugs.map((slug) => ({
            params: { slug },
        })),
        // If you have new posts frequently, you can set fallback: 'blocking' or 'true'
        fallback: false,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { slug } = context.params as { slug: string };

    // dynamically import that post file
    const { metadata } = await import(`../../pages/posts/${slug}.tsx`);

    // You could also read from markdown etc.
    // For now, just returning the metadata
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
            <Header />

            <div className="container mx-auto px-6 pt-32 pb-16">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-sm text-gray-500 mb-2">
                    By {post.author} on {post.date}
                </div>
                <div className="prose max-w-none">
                    {/* If the content is raw markdown, you can parse it with a library like 'marked' or 'react-markdown' */}
                    <p>{post.content}</p>
                </div>
            </div>
        </>
    );
}
