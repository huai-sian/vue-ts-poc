import { z } from "zod"

const photo = z.object({
  id: z.string(),
  slug: z.string(),
  created_at: z.string(),
  urls: z.object({
    raw: z.string(),
    full: z.string(),
    regular: z.string(),
    small: z.string(),
    thumb: z.string(),
    small_s3: z.string(),
  })
});

const photos = z.array(photo);

export const Types = {
  photo,
  photos
}