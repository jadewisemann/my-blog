import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

// All content lives in content/blog as standard Markdown. Everything in this
// module runs at build time (Node/server), so it is safe for `output: 'export'`.
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Derive a slug for a post: prefer explicit front-matter `slug`, otherwise
 * fall back to the file name (without extension).
 */
function resolveSlug(data, fileName) {
  if (data.slug) return String(data.slug);
  return fileName.replace(/\.mdx?$/, '');
}

/**
 * Normalize a front-matter date into an ISO date string (YYYY-MM-DD).
 * gray-matter may parse a bare YAML date into a Date object.
 */
function normalizeDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/**
 * Build a plain-text excerpt from raw markdown: use an explicit `summary`
 * front-matter field when present, otherwise the first non-empty paragraph
 * with markdown syntax stripped down to something readable.
 */
function buildExcerpt(data, content) {
  if (data.summary) return String(data.summary).trim();

  const firstParagraph = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('!'));

  if (!firstParagraph) return '';

  return firstParagraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/[*_`>#]/g, '') // emphasis / code / quote / heading marks
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Read and parse a single markdown file into structured metadata (no HTML).
 */
function readPostFile(fileName) {
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  const slug = resolveSlug(data, fileName);

  return {
    slug,
    title: data.title ? String(data.title) : slug,
    date: normalizeDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: buildExcerpt(data, content),
    content,
  };
}

/**
 * List markdown file names in the content directory.
 */
function listPostFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((name) => /\.mdx?$/.test(name));
}

/**
 * Get every post's metadata (no rendered HTML), sorted newest first.
 * @returns {Array<{slug,title,date,tags,excerpt}>}
 */
export function getAllPosts() {
  const posts = listPostFiles().map((fileName) => {
    const { content, ...meta } = readPostFile(fileName);
    return meta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * Render markdown to an HTML string via the unified/remark/rehype pipeline.
 */
async function renderMarkdown(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

/**
 * Get a single post's metadata plus rendered HTML by slug.
 * @returns {Promise<{slug,title,date,tags,excerpt,html}|null>}
 */
export async function getPostBySlug(slug) {
  const fileName = listPostFiles().find((name) => {
    const { slug: fileSlug } = readPostFile(name);
    return fileSlug === slug;
  });

  if (!fileName) return null;

  const { content, ...meta } = readPostFile(fileName);
  const html = await renderMarkdown(content);

  return { ...meta, html };
}

/**
 * Get every unique tag with a post count, sorted by count desc then name.
 * @returns {Array<{tag,count}>}
 */
export function getAllTags() {
  const counts = new Map();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Get all posts (metadata) that carry a given tag, sorted newest first.
 */
export function getPostsByTag(tag) {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
