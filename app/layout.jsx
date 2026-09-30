import { Inter, Newsreader } from 'next/font/google';
import './globals.css';

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
  title: 'my-blog',
  description: 'A minimal, readable blog built with Next.js.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
