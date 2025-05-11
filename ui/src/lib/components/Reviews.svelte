<script lang="ts">
  import { page } from "$app/state";
  import { api } from "$lib/api";
  import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import { createQuery } from "@tanstack/svelte-query";
  import { Star } from "lucide-svelte";

  const {
    params: { toiletId },
  } = page;

  const query = createQuery({
    queryKey: ["toilets", toiletId, "reviews"],
    queryFn: () => api.toilets.reviews(toiletId),
  });
</script>

<h3 class="text-xl font-semibold">Reviews ({$query.data?.data.length ?? 0})</h3>

{#await $query.data}
  <div class="flex items-start gap-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="flex w-full flex-col gap-2">
      <Skeleton class="h-12" />
      <Skeleton class="h-2" />
    </div>
  </div>
{:then res}
  {@const data = res?.data ?? []}
  {#if data.length === 0}
    No reviews yet.
  {:else}
    {#each data as review}
      <div class="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
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
{:catch _}
  <p>An error occurred.</p>
{/await}
