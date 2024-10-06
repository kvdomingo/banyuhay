<script lang="ts">
  import maplibregl, { type Map } from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { Protocol } from "pmtiles";
  import MainCard from "$lib/components/MainCard.svelte";
  import {
    API_KEY,
    INITIAL_BEARING,
    INITIAL_CENTER,
    INITIAL_PITCH,
    INITIAL_ZOOM,
  } from "$lib/constants";

  const protocol = new Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  let map: Map | undefined;
</script>

<MapLibre
  center={INITIAL_CENTER}
  zoom={INITIAL_ZOOM}
  bearing={INITIAL_BEARING}
  pitch={INITIAL_PITCH}
  standardControls="bottom-right"
  style={`https://api.maptiler.com/maps/openstreetmap/style.json?key=${API_KEY}`}
  class="h-dvh w-dvw"
  bind:map
/>

{#if map}
  <MainCard {map} />
{/if}
