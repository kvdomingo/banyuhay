<script lang="ts">
  import { getContext, onMount } from "svelte";

  import type { Writable } from "svelte/store";

  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { INITIAL_BEARING, INITIAL_CENTER, INITIAL_PITCH, INITIAL_ZOOM } from "$lib/constants";
  import { Home } from "lucide-svelte";
  import { type Map } from "maplibre-gl";

  const map = getContext<Writable<Map>>("map");
  let { lat, lng } = $map.getCenter();
  let bbox = $map.getBounds();
  let zoom = $map.getZoom();
  let bearing = $map.getBearing();
  let pitch = $map.getPitch();

  function onMove() {
    const center = $map.getCenter();
    bbox = $map.getBounds();
    lat = center.lat;
    lng = center.lng;
  }

  function onZoom() {
    zoom = $map.getZoom();
    bbox = $map.getBounds();
  }

  function onRotate() {
    bearing = $map.getBearing();
    bbox = $map.getBounds();
  }

  function onPitch() {
    pitch = $map.getPitch();
    bbox = $map.getBounds();
  }

  async function onClick() {
    await goto("/");
  }

  async function resetMap() {
    $map.setCenter(INITIAL_CENTER);
    $map.setZoom(INITIAL_ZOOM);
    $map.setBearing(INITIAL_BEARING);
    $map.setPitch(INITIAL_PITCH);
    await goto("/");
  }

  onMount(() => {
    $map.on("move", onMove);
    $map.on("zoom", onZoom);
    $map.on("rotate", onRotate);
    $map.on("pitch", onPitch);
    $map.on("click", onClick);

    return () => {
      $map.off("move", onMove);
      $map.off("zoom", onZoom);
      $map.off("rotate", onRotate);
      $map.off("pitch", onPitch);
      $map.off("click", onClick);
    };
  });
</script>

<div class="fixed top-0 left-0 z-[400] h-dvh w-1/3 p-4">
  <Card class="h-full w-full">
    <CardHeader>
      <CardTitle class="text-4xl">Banyuhay</CardTitle>
      <CardDescription>
        <p>
          n. compound word lit. <i>bagong anyong buhay</i> (metamorphosis)
        </p>
        <p>
          Also referred to in jest as <i>banyo ng buhay</i> (lit. toilet of life)
        </p>
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <Button variant="outline" size="icon" onclick={resetMap}>
        <Home />
      </Button>

      <slot />

      {#if import.meta.env.DEV}
        <div class="text-xs text-gray-400">
          <p>lat: {lat.toFixed(5)}</p>
          <p>lng: {lng.toFixed(5)}</p>
          <p>zoom: {zoom.toFixed(5)}</p>
          <p>bearing: {bearing.toFixed(5)}</p>
          <p>pitch: {pitch.toFixed(5)}</p>
          <p>bbox: {bbox}</p>
        </div>
      {/if}
    </CardContent>
  </Card>
</div>
