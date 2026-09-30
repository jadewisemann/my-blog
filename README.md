# my-blog

A minimal, readable personal blog built with [Next.js](https://nextjs.org/) (App Router) and rendered as a fully static site via `output: 'export'`. It is hosted on GitHub Pages as a project site under the `/my-blog` base path.

## Tech stack

- **Next.js (App Router)** with static export (`output: 'export'`)
- **React 19**
- File-based Markdown content parsed with `gray-matter` and rendered through a `remark`/`rehype` pipeline
- Self-hosted fonts via `next/font` for a fast, render-blocking-free typography setup

## Requirements

- Node.js `>= 20`

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

This starts the Next.js dev server (default <http://localhost:3000/my-blog>). Changes are reflected live.

## Build

```bash
npm run build
```

This runs `next build`, which — because `next.config.mjs` sets `output: 'export'` — produces a fully static site in the `out/` directory. That directory is what gets published to GitHub Pages.

The site is served under the `/my-blog` base path (configured via `basePath` and `assetPrefix` in `next.config.mjs`) because it is a GitHub Pages project site at <https://jadewisemann.github.io/my-blog/>.

## Writing posts

Posts live in `content/blog/` as Markdown files. Each file has front matter, for example:

```markdown
---
title: My Post Title
date: 2026-05-04
tags: [example, markdown]
slug: my-post-slug
summary: A one-line excerpt shown in listings.
---

Post body written in standard Markdown.
```

The content pipeline (`lib/posts.js`) reads these files at build time, sorts posts by date, generates excerpts, and renders Markdown to HTML. Pages (home, blog index, individual posts, and tag pages) are all statically generated.

## Deployment

Deployment is automated with GitHub Actions. The workflow at `.github/workflows/deploy.yml` runs on every push to the `master` branch (and can be triggered manually via `workflow_dispatch`). It installs dependencies, runs `npm run build` to produce the static `out/` directory, and publishes it to GitHub Pages at <https://jadewisemann.github.io/my-blog/>.

To enable this, set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions** (one-time setup).
