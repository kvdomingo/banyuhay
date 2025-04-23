import { browser } from "$app/environment";
import type { Review, Session, Toilet } from "$lib/types";
import { QueryClient, keepPreviousData } from "@tanstack/svelte-query";
import axios, { type AxiosResponse } from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL, withCredentials: true });

// prettier-ignore
export const api = {
  auth: {
    me: (): Promise<AxiosResponse<Session>> => axi.get("/auth/me"),
  },
  toilets: {
    list: (): Promise<AxiosResponse<Toilet[]>> => axi.get("/toilets"),
  },
  reviews: {
    list: (toilet_id: string): Promise<AxiosResponse<Review[]>> => axi.get("/reviews", {
      params: { toilet_id }
    }),
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: browser,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 3,
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 10, // 10 mins
    },
    mutations: {
      retry: false,
    },
  },
});
