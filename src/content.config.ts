import { sanityLoader } from "@sanity/astro/loader";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { sanityClient } from "sanity:client";

type BlogPost = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: unknown;
  content?: unknown;
  date?: string;
  author?: unknown;
};

const posts = defineCollection({
  loader: sanityLoader<BlogPost>({
    client: sanityClient,
    query: `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      content,
      date,
      author
    }`,
    id: (post) => post.slug,
  }),
  schema: z.object({
    _id: z.string(),
    _createdAt: z.string(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().optional(),
    coverImage: z.unknown().optional(),
    content: z.unknown().optional(),
    date: z.string().optional(),
    author: z.unknown().optional(),
  }),
});

export const collections = { posts };
