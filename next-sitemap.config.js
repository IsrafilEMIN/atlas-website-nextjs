/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://atlas-paint.com',
    generateRobotsTxt: true, // Generates robots.txt as well
    trailingSlash: true,     // Ensures no trailing slash in URLs
    exclude: [
        '/404',
        '/api/*'
    ],
};