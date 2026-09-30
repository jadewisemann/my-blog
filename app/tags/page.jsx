import Link from 'next/link';

import { getAllTags } from '@/lib/posts';

export const metadata = {
  title: 'Tags',
  description: 'Browse posts by tag.',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Tags</h1>
        <p className="page-header__lede">Browse posts by topic.</p>
      </header>

      <ul className="tag-cloud">
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`} className="tag-chip tag-chip--lg">
              {tag}
              <span className="tag-chip__count">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
