---
title: Designing for Readability
date: 2026-05-06
tags: [design, typography]
slug: designing-for-readability
summary: A few quiet principles behind this blog's typography — measure, rhythm, and a restrained palette that gets out of the way of the words.
---

Good reading design is mostly about restraint. The goal is to let the words carry the page while everything else steps back. This post shows off the long-form typography this site is built around.

## The measure matters

A comfortable line length keeps the eye from getting lost between the end of one line and the start of the next. Somewhere around **65 characters** tends to feel right for body text, which is why the article column here is deliberately narrow.

> Typography is the craft of endowing human language with a durable visual form.
>
> — Robert Bringhurst

## Rhythm and hierarchy

Vertical rhythm comes from consistent spacing between elements. Headings, paragraphs, lists, and quotes all share a common beat so the page feels calm rather than cramped.

- A serif body face for long-form reading
- A sans-serif for headings and interface text
- Generous whitespace instead of heavy rules and boxes

### Code should be legible too

Inline snippets like `const answer = 42` sit quietly in the text, while blocks get their own treatment:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('reader'));
```

## Light and dark, both considered

The palette is intentionally low-saturation in both modes, with a single warm accent for links. Nothing shouts. That is the point — you should remember what you read, not the chrome around it.

Read more in the [Obsidian Markdown Example](/my-blog/blog/obsidian-example).
