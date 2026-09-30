import Link from 'next/link';

// Understated site chrome: title on the left, primary nav + source link on the
// right. Plain hrefs — Next applies the configured basePath automatically.
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          my-blog
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/tags">Tags</Link>
          <a
            href="https://github.com/jadewisemann/my-blog"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
