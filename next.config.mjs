/**
 * Next.js configuration for static export to GitHub Pages.
 *
 * The site is deployed as a GitHub Pages *project site* at
 * https://jadewisemann.github.io/my-blog/ , so every setting below exists to
 * make a fully static build resolve correctly under the `/my-blog` sub-path.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Emit a fully static site into `out/` (no Node server at runtime).
  // This is what GitHub Pages serves.
  output: 'export',

  // The site lives under the `/my-blog` path (repo name), not the domain root.
  // basePath makes Next.js prefix internal routes/links with `/my-blog`.
  basePath: '/my-blog',

  // Static assets (the `_next/` bundle, etc.) must also be requested from the
  // `/my-blog` sub-path. Keep this consistent with basePath.
  assetPrefix: '/my-blog',

  // GitHub Pages has no Next.js Image Optimization server, so images must be
  // served as-is rather than optimized on demand.
  images: {
    unoptimized: true,
  },

  // Emit `route/index.html` instead of `route.html`, so directory-style URLs
  // (with a trailing slash) resolve correctly on GitHub Pages' static server.
  trailingSlash: true,

  // Surface potential problems during development.
  reactStrictMode: true,
};

export default nextConfig;
