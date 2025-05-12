<script lang="ts">
  import { getContext, onMount } from "svelte";

  import { Marker } from "svelte-maplibre";
  import { type Writable, writable } from "svelte/store";

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { api } from "$lib/api";
  import type { LatLng } from "$lib/types";
  import { cn } from "$lib/utils";
  import { createQuery } from "@tanstack/svelte-query";
  import { MapPin, MapPinX } from "lucide-svelte";
  import type { Map } from "maplibre-gl";

  const map = getContext<Writable<Map>>("map");
  let bounds = $state($map.getBounds());
  let bbox = $derived({
    nw: bounds.getNorthWest(),
    ne: bounds.getNorthEast(),
    sw: bounds.getSouthWest(),
    se: bounds.getSouthEast(),
  });
  let queryOpts = $derived({
    queryKey: ["toilets"],
    queryFn: () => api.toilets.list(bbox),
  });

  const query = $derived(createQuery(queryOpts));

  function handleMapChange() {
    bounds = $map.getBounds();
  }

  onMount(() => {
    $map.on("moveend", handleMapChange);
    $map.on("pitchend", handleMapChange);
    $map.on("rotateend", handleMapChange);
    $map.on("zoomend", handleMapChange);

    return () => {
      $map.off("moveend", handleMapChange);
      $map.off("pitchend", handleMapChange);
      $map.off("rotateend", handleMapChange);
      $map.off("zoomend", handleMapChange);
    };
  });
</script>

{#if $query.data}
  {@const queryData = $query.data}
  {#if queryData.data}
    {@const data = queryData.data}
    {#each data as marker}
      {@const isSelected = marker.id === page.params.toiletId}
      {@const MarkerIcon = marker.has_bidet ? MapPin : MapPinX}

      <Marker
        lngLat={[marker.geometry.lng, marker.geometry.lat]}
        onclick={async () => {
          if (isSelected) {
            await goto("/");
          } else {
            await goto(`/${marker.id}`);
          }
        }}
        class={cn("flex h-8 w-8 items-center justify-center rounded-full", {
          "h-16 w-16": isSelected,
        })}
      >
        <span>
          <MarkerIcon
            class={cn("fill-red-600 transition-all duration-100", {
              "fill-sky-500": marker.has_bidet,
              "fill-amber-300": isSelected,
            })}
            size={isSelected ? "4rem" : "2rem"}
          />
        </span>
      </Marker>
    {/each}
  {/if}
{/if}
