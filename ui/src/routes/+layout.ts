import { browser } from "$app/environment";
import { keepPreviousData, QueryClient } from "@tanstack/svelte-query";

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
      },
      mutations: {
        retry: false,
      },
    },
  });

  return { queryClient };
}
