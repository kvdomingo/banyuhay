import axios, { type AxiosResponse } from "axios";
import type { Review, Toilet } from "$lib/types";

const baseURL = "/api";

const axi = axios.create({ baseURL });

// prettier-ignore
export const api = {
  health: (): Promise<AxiosResponse<{ status: string }>> => axi.get("/health"),
  toilets: {
    list: (): Promise<AxiosResponse<Toilet[]>> => axi.get("/toilets"),
  },
  reviews: {
    list: (): Promise<AxiosResponse<Review[]>> => axi.get("/reviews"),
  },
};
