import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

function formatCompactDate(date) {
  const value = new Date(date);
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, '0');
  const day = String(value.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function BlogPostItemHeaderInfo({className}) {
  const {metadata} = useBlogPost();
  const {date} = metadata;

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
      <time dateTime={date}>{formatCompactDate(date)}</time>
    </div>
  );
}
