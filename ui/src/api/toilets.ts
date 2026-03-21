import { os } from "@orpc/server";
import { api } from "@/lib/api";

export const list = os.handler(async () => {
  try {
    const res = await api.GET("/toilets");
    if (res.error) {
      throw new Error(res);
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export default { list };
