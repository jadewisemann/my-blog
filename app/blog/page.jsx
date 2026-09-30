import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/format';

export const metadata = {
  title: 'Blog',
  description: 'All posts.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Blog</h1>
        <p className="page-header__lede">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}, newest first.
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
          </li>
        ))}
      </ul>
    </div>
  );
}
