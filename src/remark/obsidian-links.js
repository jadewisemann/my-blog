const imageExtensions = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function slug(value) {
  return value
    .trim()
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_-]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function headingId(value) {
  return slug(value);
}

function imageNode(target) {
  const cleanTarget = target.trim().replace(/\\/g, '/');
  const fileName = cleanTarget.split('/').pop();

  return {
    type: 'image',
    url: `/img/${encodeURI(cleanTarget)}`,
    alt: fileName.replace(/\.[^/.]+$/, ''),
  };
}

function linkNode(target, label) {
  const [note, heading] = target.split('#');
  const hash = heading ? `#${headingId(heading)}` : '';

  return {
    type: 'link',
    url: `/blog/${slug(note)}${hash}`,
    children: [{type: 'text', value: label || note}],
  };
}

function parse(value) {
  const parts = [];
  const pattern = /(!)?\[\[([^\]]+)\]\]/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(value))) {
    if (match.index > lastIndex) {
      parts.push({type: 'text', value: value.slice(lastIndex, match.index)});
    }

    const isEmbed = Boolean(match[1]);
    const [target, label] = match[2].split('|');
    parts.push(
      isEmbed || imageExtensions.test(target)
        ? imageNode(target)
        : linkNode(target, label),
    );
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < value.length) {
    parts.push({type: 'text', value: value.slice(lastIndex)});
  }

  return parts;
}

function transform(parent) {
  if (!parent.children) {
    return;
  }

  parent.children = parent.children.flatMap((child) => {
    transform(child);
    return child.type === 'text' && child.value.includes('[[') ? parse(child.value) : child;
  });
}

export default function obsidianLinks() {
  return transform;
}
