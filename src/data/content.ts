import { getCollection, type CollectionEntry } from "astro:content";

// Newest first. Drafts show up in `npm run dev` and are left out of the
// built site.
export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// "Mon, Sep 23, 2024"
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
