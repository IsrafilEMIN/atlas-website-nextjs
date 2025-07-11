/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://atlas-paint.com',
  generateRobotsTxt: true,
  trailingSlash: true,
  exclude: ['/404', '/api/*'],
  // This adds a line to your robots.txt file, pointing to your sitemap.
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://atlas-paint.com/sitemap.xml',
    ],
  },
};