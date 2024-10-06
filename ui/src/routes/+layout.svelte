<script lang="ts">
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import "@fontsource-variable/inter";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

  export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
  {#if import.meta.env.DEV}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
