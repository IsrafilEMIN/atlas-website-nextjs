import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
};

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
  });

module.exports = withMDX({
// Your existing Next.js config here
pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
});

export default nextConfig;
