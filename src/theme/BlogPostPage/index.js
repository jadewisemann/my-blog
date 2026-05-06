import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import Layout from '@theme/Layout';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import ContentVisibility from '@theme/ContentVisibility';
import TagsListInline from '@theme/TagsListInline';

function formatPostDate(date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

function ReadingTime({readingTime}) {
  if (typeof readingTime === 'undefined') {
    return null;
  }
  const rounded = Math.ceil(readingTime);
  return <>{rounded === 1 ? 'One min read' : `${rounded} min read`}</>;
}

function PostMetaRail({title, metadata, showTitle}) {
  const {date, readingTime, tags} = metadata;

  return (
    <section className="postMetaRail" aria-label="Post metadata">
      <div className="postMetaRail__sticky">
        {showTitle && <h2 className="postMetaRail__title">{title}</h2>}
        <div className="postMetaRail__label">/ Metadata</div>
        <dl className="postMetaRail__list">
          <div>
            <dt>Date:</dt>
            <dd>{formatPostDate(date)}</dd>
          </div>
          {typeof readingTime !== 'undefined' && (
            <div>
              <dt>Reading time:</dt>
              <dd>
                <ReadingTime readingTime={readingTime} />
              </dd>
            </div>
          )}
        {tags.length > 0 && (
          <div>
            <dt>Tags:</dt>
            <dd>
              <TagsListInline tags={tags} />
            </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

function RecentPostsSection({items = []}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="postRecentSection" aria-label="Recent posts">
      <div className="postRecentSection__label">/ Recent posts</div>
      <ol className="postRecentSection__list">
        {items.map((item, index) => (
          <li key={item.permalink}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Link to={item.permalink}>{item.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BlogPostPageContent({sidebar, children}) {
  const titleRef = useRef(null);
  const [showRailTitle, setShowRailTitle] = useState(false);
  const {metadata} = useBlogPost();
  const {readingTime, tags, title} = metadata;

  useEffect(() => {
    const titleNode = titleRef.current;
    if (!titleNode) {
      return undefined;
    }

    const updateRailTitle = () => {
      const navbarHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--ifm-navbar-height',
        ),
      );
      const hiddenAboveViewport =
        titleNode.getBoundingClientRect().bottom <= (navbarHeight || 0);
      setShowRailTitle(hiddenAboveViewport);
    };

    updateRailTitle();
    window.addEventListener('scroll', updateRailTitle, {passive: true});
    window.addEventListener('resize', updateRailTitle);
    return () => {
      window.removeEventListener('scroll', updateRailTitle);
      window.removeEventListener('resize', updateRailTitle);
    };
  }, []);

  return (
    <Layout>
      <div className="container margin-vert--lg">
        <div className="blogPostShell">
          <ContentVisibility metadata={metadata} />
          <article className="blogPostArticle">
            <header className="blogPostHero">
              <h1 ref={titleRef}>{title}</h1>
            </header>

            <PostMetaRail
              title={title}
              metadata={metadata}
              showTitle={showRailTitle}
            />

            <div id="__blog-post-container" className="markdown blogPostBody">
              {children}
            </div>
          </article>

          <RecentPostsSection items={sidebar?.items ?? []} />
        </div>
      </div>
    </Layout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
