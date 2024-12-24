<script lang="ts">
  import maplibre, { type Map } from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import "@fontsource-variable/inter";
  import "../app.css";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import MainCard from "$lib/components/MainCard.svelte";
  import Markers from "$lib/components/Markers.svelte";
  import { setContext } from "svelte";
  import { INITIAL_BEARING, INITIAL_CENTER, INITIAL_PITCH, INITIAL_ZOOM } from "$lib/constants";
  import { writable } from "svelte/store";
  import { Protocol } from "pmtiles";
  import { page } from "$app/stores";
  import { queryClient } from "$lib/api";
  import LoginUserHeader from "$lib/components/LoginUserHeader.svelte";

  const protocol = new Protocol();
  maplibre.addProtocol("pmtiles", protocol.tile);

  const map = writable<Map>();
  setContext("map", map);
</script>

<QueryClientProvider client={queryClient}>
  <MapLibre
    center={INITIAL_CENTER}
    zoom={INITIAL_ZOOM}
    bearing={INITIAL_BEARING}
    pitch={INITIAL_PITCH}
    standardControls="bottom-right"
    style="https://tiles.openfreemap.org/styles/bright"
    class="h-dvh w-dvw"
    bind:map={$map}
  >
    {#if $map}
      <Markers />
    {/if}
  </MapLibre>

  <LoginUserHeader />

  {#if $map}
    {#key $page.params.toiletId}
      <MainCard>
        <slot />
      </MainCard>
    {/key}
  {/if}

  {#if import.meta.env.DEV}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
