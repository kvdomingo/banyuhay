import { browser } from "$app/environment";
import { keepPreviousData, QueryClient } from "@tanstack/svelte-query";
import { api } from "$lib/api";

export async function load() {
  const queryClient = new QueryClient({
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

  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: api.toilets.list,
  });

  return { queryClient };
}
