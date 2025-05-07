/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://atlas-paint.com',
    generateRobotsTxt: true, // Generates robots.txt as well
    trailingSlash: true,     // Ensures there is trailing slash in URLs
    exclude: [
        '/404',
        '/api/*'
    ],
};