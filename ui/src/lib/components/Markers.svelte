<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import { Marker } from "svelte-maplibre";
  import { cn } from "$lib/utils";
  import { MapPin, MapPinX } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

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
      {@const isSelected = marker.id === $page.params.toiletId}
      {@const MarkerIcon = marker.has_bidet ? MapPin : MapPinX}

      <Marker
        lngLat={[marker.geometry.lng, marker.geometry.lat]}
        on:click={async () => await goto(`/${marker.id}`)}
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
