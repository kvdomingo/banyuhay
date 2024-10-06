<script lang="ts">
  import { browser } from "$app/environment";
  import { keepPreviousData, QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import "@fontsource-variable/inter";
  import "../app.css";

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
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
