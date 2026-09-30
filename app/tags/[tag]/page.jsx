import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllTags, getPostsByTag } from '@/lib/posts';
import { formatDate } from '@/lib/format';

// Enumerate every tag at build time for static export. The param is
// URL-encoded so tags containing spaces or non-ASCII characters still produce
// valid static paths; the page decodes it back before looking the tag up.
export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  return {
    title: `#${tag}`,
    description: `Posts tagged ${tag}.`,
  };
}

export default async function TagPage({ params }) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="page">
      <header className="page-header">
        <p className="page-header__eyebrow">Tag</p>
        <h1 className="page-header__title">#{tag}</h1>
        <p className="page-header__lede">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}.
        </p>
      </header>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug} className="post-list__item">
            <Link href={`/blog/${post.slug}`} className="post-list__link">
              <h2 className="post-list__title">{post.title}</h2>
              <time className="post-list__date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <p className="post-list__excerpt">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="page-back">
        <Link href="/tags">&larr; All tags</Link>
      </p>
    </div>
  );
}
