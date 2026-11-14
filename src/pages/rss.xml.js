import rss from "@astrojs/rss";
import { getPosts } from "../data/content";

export async function GET(context) {
  return rss({
    title: "eiilo blog",
    description: "Longer writing from eiilo: announcements, how we work and what we learn.",
    site: context.site,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
  });
}
