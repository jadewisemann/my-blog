import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

// Self-hosted webfonts via next/font: fonts are downloaded and served from the
// same origin at build time, exposed as CSS variables. This avoids any
// render-blocking @import to Google Fonts and prevents layout-shift.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata = {
  metadataBase: new URL('https://jadewisemann.github.io/my-blog/'),
  title: {
    default: 'my-blog',
    template: '%s · my-blog',
  },
  description: 'A minimal, readable blog built with Next.js.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
