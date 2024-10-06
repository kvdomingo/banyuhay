import { z } from "zod";

export const Toilet = z.object({
  id: z.string().uuid(),
  created: z.date(),
  modified: z.date(),
  establishment_name: z.string().min(1),
  geometry: z.object({
    lat: z.number().gte(-90).lte(90),
    lng: z.number().gte(-180).lte(180),
  }),
  location_information: z.string().min(1),
  avg_rating_water_pressure: z.number().gte(0).lte(5),
  avg_rating_cleanliness: z.number().gte(0).lte(5),
  avg_rating_poopability: z.number().gte(0).lte(5),
  total_reviews: z.number().gte(0),
  has_bidet: z.boolean(),
  upvotes: z.number().int().gte(0),
  downvotes: z.number().int().gte(0),
  photos: z.array(z.string()),
});

export type Toilet = z.infer;

export const Review = z.object({
  id: z.string().uuid(),
  created: z.date(),
  modified: z.date(),
  toilet_id: z.string().uuid(),
  content: z.string().nullable(),
  rating_water_pressure: z.number().gte(0).lte(5),
  rating_cleanliness: z.number().int().gte(0).lte(5),
  rating_poopability: z.number().int().gte(0).lte(5),
  has_bidet: z.boolean(),
  is_approved: z.boolean(),
  upvotes: z.number().int().gte(0),
  downvotes: z.number().int().gte(0),
  photos: z.array(z.string()),
});

export type Review = z.infer;
