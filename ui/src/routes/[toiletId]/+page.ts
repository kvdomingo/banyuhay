import { api } from "$lib/api";

export async function load({ parent, params }) {
  const { queryClient } = await parent();
  const { toiletId } = params;

  await queryClient.prefetchQuery({
    queryKey: ["toilets", toiletId],
    queryFn: async () => await api.toilets.reviews(toiletId),
  });
}
