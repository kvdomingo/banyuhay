<script lang="ts">
  import { setContext } from "svelte";

  import { MapLibre } from "svelte-maplibre";
  import { writable } from "svelte/store";

  import { page } from "$app/state";
  import { queryClient } from "$lib/api";
  import LoginUserHeader from "$lib/components/LoginUserHeader.svelte";
  import MainCard from "$lib/components/MainCard.svelte";
  import Markers from "$lib/components/Markers.svelte";
  import { INITIAL_BEARING, INITIAL_CENTER, INITIAL_PITCH, INITIAL_ZOOM } from "$lib/constants";
  import "@fontsource-variable/inter";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import maplibre, { type Map } from "maplibre-gl";
  import { Protocol } from "pmtiles";

  import "../app.css";

  const protocol = new Protocol();

  maplibre.addProtocol("pmtiles", protocol.tile);

  const map = writable<Map>();

  setContext("map", map);
</script>

<svelte:head>
  {#if import.meta.env.PROD}
    <script
      defer
      src="https://umami.kvd.studio/script.js"
      data-website-id="7d86dc8d-696b-41b7-8fbf-92e99c8d7e44"
    ></script>
  {/if}
</svelte:head>

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
    {#key page.params.toiletId}
      <MainCard>
        <slot />
      </MainCard>
    {/key}
  {/if}

  {#if import.meta.env.DEV}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
