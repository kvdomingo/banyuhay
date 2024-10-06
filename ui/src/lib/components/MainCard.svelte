<script lang="ts">
  import { Map } from "maplibre-gl";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Home } from "lucide-svelte";
  import { INITIAL_BEARING, INITIAL_CENTER, INITIAL_PITCH, INITIAL_ZOOM } from "$lib/constants";
  import { onMount } from "svelte";

  export let map: Map;

  let { lat, lng } = map.getCenter();
  let zoom = map.getZoom();
  let bearing = map.getBearing();
  let pitch = map.getPitch();

  function onMove() {
    const center = map.getCenter();
    lat = center.lat;
    lng = center.lng;
  }

  function onZoom() {
    zoom = map.getZoom();
  }

  function onRotate() {
    bearing = map.getBearing();
  }

  function onPitch() {
    pitch = map.getPitch();
  }

  function resetMap() {
    map.setCenter(INITIAL_CENTER);
    map.setZoom(INITIAL_ZOOM);
    map.setBearing(INITIAL_BEARING);
    map.setPitch(INITIAL_PITCH);
  }

  onMount(() => {
    map.on("move", onMove);
    map.on("zoom", onZoom);
    map.on("rotate", onRotate);
    map.on("pitch", onPitch);

    return () => {
      map.off("move", onMove);
      map.off("zoom", onZoom);
      map.off("rotate", onRotate);
      map.off("pitch", onPitch);
    };
  });
</script>

<Card class="fixed left-0 top-0 z-[400] m-4 w-1/4">
  <CardHeader>
    <CardTitle class="text-4xl">Banyuhay</CardTitle>
    <CardDescription>
      <p>
        n. compound word lit. <i>bagong anyong buhay</i> (metamorphosis)
      </p>
      <p>
        Also jokingly referred to as <i>banyo ng buhay</i> (lit. toilet of life)
      </p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Button variant="outline" size="icon" class="mb-4" on:click={resetMap}>
      <Home />
    </Button>
    {#if import.meta.env.DEV}
      <p>lat: {lat.toFixed(5)}</p>
      <p>lng: {lng.toFixed(5)}</p>
      <p>zoom: {zoom.toFixed(5)}</p>
      <p>bearing: {bearing.toFixed(5)}</p>
      <p>pitch: {pitch.toFixed(5)}</p>
    {/if}
  </CardContent>
</Card>
