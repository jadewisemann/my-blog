import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/format';

// Enumerate every post at build time so `output: 'export'` can pre-render them.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="post">
      <header className="post__header">
        <h1 className="post__title">{post.title}</h1>
        <div className="post__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.length > 0 && (
            <ul className="tag-row">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/tags/${tag}`} className="tag-chip">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="post__footer">
        <Link href="/blog">&larr; Back to all posts</Link>
      </footer>
    </article>
  );
}
