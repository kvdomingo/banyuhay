<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import { Marker } from "svelte-maplibre";
  import { cn } from "$lib/utils";
  import { MapPin, MapPinX } from "lucide-svelte";

  export let selectedToiletId: string | null;

  const query = createQuery({
    queryKey: ["toilets"],
    queryFn: api.toilets.list,
  });
</script>

{#if $query.data}
  {@const queryData = $query.data}
  {#if queryData.data}
    {@const data = queryData.data}
    {#each data as marker}
      {@const isSelected = marker.id === selectedToiletId}
      {@const MarkerIcon = marker.has_bidet ? MapPin : MapPinX}

      <Marker
        lngLat={[marker.geometry.lng, marker.geometry.lat]}
        on:click={() => {
          if (selectedToiletId === marker.id) {
            selectedToiletId = null;
          } else {
            selectedToiletId = marker.id;
          }
        }}
        class={cn("flex h-8 w-8 items-center justify-center rounded-full", {
          "h-12 w-12": isSelected,
        })}
      >
        <span>
          <MarkerIcon
            class={cn("fill-red-600 transition-all duration-100", {
              "fill-sky-500": marker.has_bidet,
              "fill-amber-300": isSelected,
            })}
            size={isSelected ? "3rem" : "2rem"}
          />
        </span>
      </Marker>
    {/each}
  {/if}
{/if}
