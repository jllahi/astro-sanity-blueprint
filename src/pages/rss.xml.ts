// import { filterContent } from '@/utils/content'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'
import { getPosts } from '@/utils/sanity'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  // const allPosts = await getCollection('posts')
  // const posts = filterContent(allPosts)
  const posts = await getPosts()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    items: posts.map((post) => ({
      // ...post.data,
      title: post.title,
      // pubDate: post._createdAt,
      description: post.excerpt,
      // customData: post.data.date,
      link: `/post/${post.slug.current}/`,
    })),
  })
}
