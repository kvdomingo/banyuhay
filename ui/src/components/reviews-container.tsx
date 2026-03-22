import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { MilkOff, SprayCan, Star } from "lucide-react";
import { orpc } from "@/api";
import { Reviews } from "@/components/reviews";
import { cn } from "@/lib/utils";

const Route = getRouteApi("/");

export function ReviewsContainer() {
  const search = Route.useSearch();
  const toiletId = search?.toilet_id;

  const { data: toilets = [] } = useQuery(
    orpc.toilet.list.queryOptions({
      input: {
        min_lng: search?.min_lng ?? 0,
        max_lng: search?.max_lng ?? 0,
        min_lat: search?.min_lat ?? 0,
        max_lat: search?.max_lat ?? 0,
      },
      placeholderData: keepPreviousData,
      enabled: search && [Object.values(search)].every(Boolean),
    }),
  );

  const toilet = toilets?.find((t) => t.id === toiletId);

  if (!toilet || !toiletId) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-2xl">{toilet.establishment_name}</h2>
        <p className="text-gray-400">{toilet.location_information}</p>
      </div>
      <div className="flex items-center gap-2">
        {toilet.has_bidet ? <SprayCan /> : <MilkOff />}
        <p
          className={cn("font-semibold", {
            "text-green-500": toilet.has_bidet,
            "text-red-500": !toilet.has_bidet,
          })}
        >
          {toilet.has_bidet ? "May bidet!" : "Walang bidet!"}
        </p>
      </div>
      <div>
        <p className="flex items-center gap-1">
          Water Pressure:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_water_pressure.toFixed(1)}
        </p>
        <p className="flex items-center gap-1">
          Cleanliness:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_cleanliness.toFixed(1)}
        </p>
        <p className="flex items-center gap-1">
          Poopability:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_poopability.toFixed(1)}
        </p>
      </div>

      <Reviews toiletId={toiletId} />
    </div>
  );
}
