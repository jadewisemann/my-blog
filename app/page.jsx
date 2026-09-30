import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/format';

export default function HomePage() {
  const recent = getAllPosts().slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <h1 className="hero__title">Writing, quietly.</h1>
        <p className="hero__lede">
          A small, deliberately minimal blog about design, typography, and the
          craft of building for the web. Built with Next.js and served as a
          static site.
        </p>
        <p className="hero__cta">
          <Link href="/blog">Read the blog &rarr;</Link>
        </p>
      </section>

      <section className="recent">
        <h2 className="section-heading">Recent posts</h2>
        <ul className="post-list">
          {recent.map((post) => (
            <li key={post.slug} className="post-list__item">
              <Link href={`/blog/${post.slug}`} className="post-list__link">
                <h3 className="post-list__title">{post.title}</h3>
                <time className="post-list__date" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <p className="post-list__excerpt">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
