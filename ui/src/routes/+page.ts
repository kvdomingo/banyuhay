import { api } from "$lib/api";

export async function load({ parent }) {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ["toilets"],
    queryFn: api.toilets.list,
  });
}
