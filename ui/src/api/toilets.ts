import { os } from "@orpc/server";
import z from "zod";
import { api } from "@/lib/api";
import type { paths } from "@/lib/api/generated";

export const list = os
  .input(
    z.object({
      min_lng: z.number(),
      max_lng: z.number(),
      min_lat: z.number(),
      max_lat: z.number(),
    }) satisfies z.ZodType<paths["/toilets"]["get"]["parameters"]["query"]>,
  )
  .handler(async ({ input: query }) => {
    try {
      const res = await api.GET("/toilets", {
        params: { query },
      });
      if (res.error) {
        throw res.error.detail;
      }
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

export default { list };
