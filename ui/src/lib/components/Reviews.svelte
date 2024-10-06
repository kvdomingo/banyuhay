<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import { Star } from "lucide-svelte";

  export let selectedToiletId: string | null;

  const query = createQuery({
    queryKey: ["toilets", selectedToiletId],
    queryFn: async () => await api.toilets.reviews(selectedToiletId!),
    enabled: selectedToiletId != null,
  });
</script>

<h3 class="text-xl font-semibold">Reviews ({$query.data?.data.length ?? 0})</h3>

{#if $query.isLoading}
  <div class="flex items-start gap-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="flex w-full flex-col gap-2">
      <Skeleton class="h-12" />
      <Skeleton class="h-2" />
    </div>
  </div>
{:else if $query.data && selectedToiletId}
  {@const queryData = $query.data}
  {#if queryData.data}
    {@const data = queryData.data}
    {#if data.length === 0}
      No reviews yet.
    {:else}
      {#each data as review}
        <div class="flex items-start gap-4">
          <Avatar.Root>
            <Avatar.Fallback>AN</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex w-full flex-col gap-2">
            <div class="grid grid-cols-3">
              <div class="flex flex-col items-center gap-1">
                <small>Water Pressure:</small>
                <div class="flex">
                  {#if review.rating_water_pressure === 0}
                    💩
                  {:else}
                    {#each Array(review.rating_water_pressure) as _}
                      <Star class="fill-amber-500" size="1rem" />
                    {/each}
                  {/if}
                </div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <small>Cleanliness:</small>
                <div class="flex">
                  {#if review.rating_water_pressure === 0}
                    💩
                  {:else}
                    {#each Array(review.rating_cleanliness) as _}
                      <Star class="fill-amber-500" size="1rem" />
                    {/each}
                  {/if}
                </div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <small> Poopability: </small>
                <div class="flex">
                  {#if review.rating_water_pressure === 0}
                    💩
                  {:else}
                    {#each Array(review.rating_poopability) as _}
                      <Star class="fill-amber-500" size="1rem" />
                    {/each}
                  {/if}
                </div>
              </div>
            </div>
            {#if review.content}
              <p>{review.content}</p>
            {:else}
              <p class="text-gray-400"><i>No comment.</i></p>
            {/if}
            <small class="text-gray-400">Reviewed {review.created}</small>
          </div>
        </div>
      {/each}
    {/if}
  {/if}
{/if}
