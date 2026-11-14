# blog.eiilo.com

The eiilo blog: a list of posts, a page per post and an RSS feed. It looks
like [eiilo.com](https://eiilo.com) (the `eiilo-com` repository) and shares
its top bar. Short news ("updates") is not here: it is on eiilo.com.

It is a static site built with [Astro](https://astro.build). `npm run build`
writes plain files to `dist/`, and a GitHub Actions workflow publishes them
to GitHub Pages.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # writes dist/
npm run preview   # serves dist/ as it will be published
```

Node 22.23.4 or later.

## Write a post

```sh
npm run new "Title of the post"
```

This creates a Markdown file in `src/content/blog/` with today's date. Write
below the second `---`, fill in `description`, then delete the `draft: true`
line and push to `main`.

You can also create the file by hand, or in GitHub's web editor:

```md
---
title: Title of the post
date: 2026-11-14
description: One sentence, shown in the list, in search results and in the feed.
---

The text, in Markdown.
```

- The file name is the address: `my-post.md` is published at
  `blog.eiilo.com/my-post/`. Don't rename a file once it is live.
- `draft: true` keeps a post out of the published site. `npm run dev` still
  shows it.
- The build fails with a message naming the file when a field is missing or a
  date is wrong.
- Text between single asterisks (`*eiilo*`) is shown bold and mint, as the
  brand name is across the site.
- For an image, put it in `public/images/` and write `![What it shows](/images/name.png)`.

## Files

```
src/content/blog/       the posts, one Markdown file each
src/content.config.ts   the fields a post must have
src/pages/index.astro   the list of posts
src/pages/[id].astro    a post
src/pages/rss.xml.js    the feed
src/layouts/            Base (<head>, top bar, footer; the links go to eiilo.com) and Page
src/components/         logo, cards
scripts/new.mjs         `npm run new`
public/                 copied as is: CNAME, robots.txt, favicon
```

These are copies of the files in `eiilo-com`; when the look of eiilo.com
changes, copy them again: `src/styles/global.css`, `src/scripts/motion.js`
and `src/components/EntryCards.astro`.

The blog is kept plain: page titles have no drifting products or 3D logo
behind them, so `src/layouts/Page.astro` is this site's own and is not copied.

## Publish

A GitHub Pages site has one custom domain, so this subdomain is its own
repository with its own Pages site. Every push to `main` runs
`.github/workflows/deploy.yml`. To set it up once:

1. In the repository, open Settings > Pages and set **Source** to
   **GitHub Actions**.
2. Under **Custom domain**, enter `blog.eiilo.com`. `public/CNAME` holds the
   same name.
3. At the DNS provider, add one record: `blog` `CNAME` `<account>.github.io.`
   where `<account>` is the user or organisation that owns this repository.
4. Once the certificate is issued, tick **Enforce HTTPS**.

The old addresses, `eiilo.com/blog/` and `eiilo.com/blog/announcing-eiilo/`,
redirect here (see `redirects` in `eiilo-com`'s `astro.config.mjs`). Publish
this site before the new eiilo.com, so they never lead nowhere.
