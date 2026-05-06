import React, {memo, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {
  BlogSidebarItemList,
  useVisibleBlogSidebarItems,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import styles from './styles.module.css';

const ListComponent = ({items}) => (
  <BlogSidebarItemList
    items={items}
    ulClassName={clsx(styles.sidebarItemList, 'clean-list')}
    liClassName={styles.sidebarItem}
    linkClassName={styles.sidebarItemLink}
    linkActiveClassName={styles.sidebarItemLinkActive}
  />
);

function BlogSidebarDesktop({sidebar}) {
  const [isOpen, setIsOpen] = useState(true);
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <aside className={clsx('col col--3', styles.sidebarShell, !isOpen && styles.sidebarShellCollapsed)}>
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <button
          type="button"
          className={styles.sidebarToggle}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}>
          <span>{sidebar.title}</span>
          <span aria-hidden="true">{isOpen ? '-' : '+'}</span>
        </button>
        {isOpen && (
          <BlogSidebarContent
            items={items}
            ListComponent={ListComponent}
            yearGroupHeadingClassName={styles.yearGroupHeading}
          />
        )}
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
