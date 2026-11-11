import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { loadQuery } from "@/sanity/load-query";
import { queryAllPosts } from "@/sanity/queries/post.groq";
import type { Post } from "@/sanity/types";

export async function GET(context: APIContext) {
  // const posts = await queryAllPosts()
  const { data: posts } = await loadQuery<Post[]>({
    query: queryAllPosts,
  });

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
