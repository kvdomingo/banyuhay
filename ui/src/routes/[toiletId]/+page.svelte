<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import { page } from "$app/stores";
  import { MilkOff, SprayCan, Star } from "lucide-svelte";
  import { cn } from "$lib/utils";
  import Reviews from "$lib/components/Reviews.svelte";

  const { toiletId } = $page.params;

  const query = createQuery({
    queryKey: ["toilets"],
    queryFn: api.toilets.list,
  });
</script>

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
