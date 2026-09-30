import Link from 'next/link';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>&copy; {year} my-blog</span>
        <span className="site-footer__links">
          <Link href="/blog">Blog</Link>
          <Link href="/tags">Tags</Link>
          <a
            href="https://github.com/jadewisemann/my-blog"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
