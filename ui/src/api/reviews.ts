import { os } from "@orpc/server";
import z from "zod";
import { api } from "@/lib/api";
import type { paths } from "@/lib/api/generated";

const list = os
  .input(
    z.object({
      toilet_id: z.uuid(),
    }) satisfies z.ZodType<paths["/reviews"]["get"]["parameters"]["query"]>,
  )
  .handler(async ({ input: query }) => {
    try {
      const res = await api.GET("/reviews", {
        params: { query },
      });
      if (res.error) {
        throw res.error.detail;
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  });

export default { list };
