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

// prettier-ignore
export type Toilet = z.infer<typeof Toilet>;

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

// prettier-ignore
export type Review = z.infer<typeof Review>;

export const Session = z.object({
  user_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  emails: z.array(z.string().email()),
});

// prettier-ignore
export type Session = z.infer<typeof Session>;

export const LatLng = z.object({
  lat: z.number().gte(-90).lte(90),
  lng: z.number().gte(-180).lte(180),
});

// prettier-ignore
export type LatLng = z.infer<typeof LatLng>;

export const BboxRequestParam = z.object({
  nw: LatLng,
  ne: LatLng,
  sw: LatLng,
  se: LatLng,
});

// prettier-ignore
export type BboxRequestParam = z.infer<typeof BboxRequestParam>;
