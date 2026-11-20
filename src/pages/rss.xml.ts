import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import type { Post } from "@/sanity/types";

export async function GET(context: APIContext) {
  const entries = await getCollection("posts");
  const posts = entries.map(({ data }) => data as unknown as Post);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post._updatedAt),
      description: post.excerpt,
      link: `/post/${post.slug.current}/`,
    })),
  });
}
