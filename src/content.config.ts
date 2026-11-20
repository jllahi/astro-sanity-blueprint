import { sanityLoader } from "@sanity/astro/loader";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { sanityClient } from "sanity:client";

type BlogPost = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: unknown;
  content?: unknown;
  date?: string;
  author?: unknown;
  lqip?: string | null;
};

const posts = defineCollection({
  loader: sanityLoader<BlogPost>({
    client: sanityClient,
    query: `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      _type,
      _rev,
      title,
      slug,
      excerpt,
      "lqip": coverImage.asset->metadata.lqip,
      coverImage {
        ...,
        asset->{
          ...,
          metadata
        }
      },
      content[]{
        ...,
        image{
          ...,
          asset->{
            ...,
            metadata
          }
        }
      },
      date,
      author
    }`,
    id: (post) => post.slug.current,
  }),
  schema: z.object({
    _id: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    title: z.string(),
    slug: z.object({
      current: z.string(),
      _type: z.string().optional(),
    }),
    excerpt: z.string().optional(),
    coverImage: z.unknown().optional(),
    content: z.unknown().optional(),
    date: z.string().optional(),
    author: z.unknown().optional(),
  }),
});

export const collections = { posts };
