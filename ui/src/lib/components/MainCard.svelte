<script lang="ts">
  import { type Map } from "maplibre-gl";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Home, Star, SprayCan, MilkOff } from "lucide-svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import Reviews from "$lib/components/Reviews.svelte";
  import { INITIAL_BEARING, INITIAL_CENTER, INITIAL_PITCH, INITIAL_ZOOM } from "$lib/constants";

  const { toiletId } = $page.params;

  const query = createQuery({
    queryKey: ["toilets"],
    queryFn: api.toilets.list,
  });

  const map = getContext<Writable<Map>>("map");
  let { lat, lng } = $map.getCenter();
  let zoom = $map.getZoom();
  let bearing = $map.getBearing();
  let pitch = $map.getPitch();

  function onMove() {
    const center = $map.getCenter();
    lat = center.lat;
    lng = center.lng;
  }

  function onZoom() {
    zoom = $map.getZoom();
  }

  function onRotate() {
    bearing = $map.getBearing();
  }

  function onPitch() {
    pitch = $map.getPitch();
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

<div class="fixed left-0 top-0 z-[400] h-dvh w-1/3 p-4">
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
      <Button variant="outline" size="icon" on:click={resetMap}>
        <Home />
      </Button>

      {#if $query.data?.data}
        {@const data = $query.data?.data}
        {@const toilet = data.find(d => d.id === toiletId)}
        {#if toilet}
          <div class="flex flex-col gap-4">
            <div>
              <h2 class="text-2xl font-semibold">{toilet.establishment_name}</h2>
              <p class="text-gray-400">{toilet.location_information}</p>
            </div>
            <div class="flex items-center gap-2">
              {#if toilet.has_bidet}
                <SprayCan />
              {:else}
                <MilkOff />
              {/if}
              <p
                class={cn("font-semibold", {
                  "text-green-500": toilet.has_bidet,
                  "text-red-500": !toilet.has_bidet,
                })}
              >
                {#if toilet.has_bidet}
                  May bidet!
                {:else}
                  Walang bidet!
                {/if}
              </p>
            </div>
            <div>
              <p class="flex items-center gap-1">
                Water Pressure:
                <Star size="1rem" class="fill-amber-500 text-amber-500" />
                {toilet.avg_rating_water_pressure.toFixed(1)}
              </p>
              <p class="flex items-center gap-1">
                Cleanliness:
                <Star size="1rem" class="fill-amber-500 text-amber-500" />
                {toilet.avg_rating_cleanliness.toFixed(1)}
              </p>
              <p class="flex items-center gap-1">
                Poopability:
                <Star size="1rem" class="fill-amber-500 text-amber-500" />
                {toilet.avg_rating_poopability.toFixed(1)}
              </p>
            </div>

            <Reviews />
          </div>
        {/if}
      {/if}

      {#if import.meta.env.DEV}
        <div class="text-xs text-gray-400">
          <p>lat: {lat.toFixed(5)}</p>
          <p>lng: {lng.toFixed(5)}</p>
          <p>zoom: {zoom.toFixed(5)}</p>
          <p>bearing: {bearing.toFixed(5)}</p>
          <p>pitch: {pitch.toFixed(5)}</p>
        </div>
      {/if}
    </CardContent>
  </Card>
</div>
