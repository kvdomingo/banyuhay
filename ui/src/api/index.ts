import { QueryClient, keepPreviousData } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
