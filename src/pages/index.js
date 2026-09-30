import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const features = [
  {
    icon: '✍️',
    title: 'Written in Obsidian',
    description:
      'Notes drafted in Obsidian are published as-is. Wiki links and embeds just work, so writing stays frictionless.',
  },
  {
    icon: '🎨',
    title: 'Designed to read',
    description:
      'A calm indigo palette, comfortable typography and a coherent dark mode make every post a pleasure to read.',
  },
  {
    icon: '⚡',
    title: 'Fast & static',
    description:
      'Built with Docusaurus and deployed to GitHub Pages. No servers, no databases — just quick, static pages.',
  },
];

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.eyebrow}>Personal notes & essays</p>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/blog">
            Read the blog →
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.ghostButton)}
            to="/blog/tags">
            Browse by tag
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className={clsx('container', styles.ctaInner)}>
        <h2 className={styles.ctaTitle}>Fresh posts, straight from the vault.</h2>
        <p className={styles.ctaText}>
          Dive into the latest notes and long-form pieces.
        </p>
        <Link className="button button--primary button--lg" to="/blog">
          Explore all posts
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
    </Layout>
  );
}
